// src/infrastructure/persistence/mongoose/task.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/core/domain/calendar-bot/tasks/task';
import { TaskRepository } from 'src/core/domain/calendar-bot/tasks/tasks.repository';
import { TaskModel } from './schema';
import { UserId } from 'src/core/domain/auth/users/value-objects/id';
import { TaskId } from 'src/core/domain/calendar-bot/tasks/value-objects/id';
import { PartyId } from 'src/core/domain/calendar-bot/parties/value-objects/id';



@Injectable()
export class MongoTaskRepository implements TaskRepository {
  constructor(@InjectModel(TaskModel.name) private taskModel: Model<TaskModel>) {}

   mapToDomainTask(mongoTask:TaskModel): Task { 
    return Task.create(
      UserId.fromExisting(mongoTask.user_id),
      mongoTask.title,
      mongoTask.description,
      mongoTask.date,
      mongoTask.duration,
      mongoTask.hour,
      PartyId.fromExisting(mongoTask.party_id),
      TaskId.fromExisting(mongoTask.id),
    );
  }
  
  async save(task: Task){
    const createdTask = new this.taskModel({
        id:task.id.value,
        title:task.title.title,
        description:task.description.Description,
        duration:task.duration.toMinutes(),
        hour:task.hour.hour,
        date:task.date.date,
        user_id:task.userId.value,
        party_id:task.party_id.value
      

    });
    await createdTask.save();
  }

  async getForUserAndDaterange(userId: string,user_partiesIds:string[], date1: string, date2: string): Promise<Task[]> {
    
    // Crear las fechas en formato de cadena 'YYYY-MM-DD'
    const startDate = new Date(date1).toISOString().split("T")[0];
    const endDate = new Date(date2).toISOString().split("T")[0];

    const tasks = await this.taskModel
    .find({
      $or: [
        { user_id: userId },
        { party_id: { $in: user_partiesIds } } 
      ],
      date: {
        $gte: startDate, 
        $lte: endDate, 
      },
    })
    .exec();
  

    return tasks.map(this.mapToDomainTask);

  }

  async getNewActivityForUser(userId: string,user_partiesIds:string[],user_last_check:Date,): Promise<Task[]> {  

    const domainTasks = [];

  
    const tasks = await this.taskModel.find({
      $and: [
        { user_id: { $ne: userId } }, 
        { party_id: { $in: user_partiesIds } }, 
        { created_at: { $gte: user_last_check } }
      ]
    }).exec();

    for(let i = 0; i<tasks.length; i++){
      domainTasks.push(this.mapToDomainTask(tasks[i]))
    }
    
    return domainTasks;

  }

  async delete(task_id: string): Promise<void> {
  console.log(`eliminando la task con id: ${task_id}`);

  // Verifica que la tarea exista antes de intentar eliminarla
  const taskExists = await this.taskModel.exists({ id: task_id });
  if (!taskExists) {
    console.log(`No se encontró la tarea con id: ${task_id}`);
    return;
  }

  const result = await this.taskModel.deleteOne({ id: task_id });
  console.log(`Resultado de eliminación: ${result.deletedCount}`);
  }

  async findById(task_id: string): Promise<Task> {
    try {
      console.log(`mongo lookinf for id:${task_id}`)
      const mongoTask = await this.taskModel.findOne({id:task_id})
      console.log(`task to edit: ${mongoTask}`)
      const domainTask = this.mapToDomainTask(mongoTask);

      return domainTask;
      
    } catch (error) {
      console.log(error)
    }
   
  }

  async update(task: Task): Promise<void> {
    await this.taskModel.updateOne(
      { id: task.id.value }, 
      {
        $set: {
          title: task.title.title,
          description: task.description.Description,
          date: task.date.date,
          last_modified: new Date(), 
          duration: task.duration.toMinutes(),
          hour: task.hour.hour,
          user_id:task.userId.value
          
        },
      },
      { runValidators: true } 

    );
  }
}
