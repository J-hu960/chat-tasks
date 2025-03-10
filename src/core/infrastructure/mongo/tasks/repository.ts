// src/infrastructure/persistence/mongoose/task.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/core/domain/calendar-bot/tasks/task';
import { TaskRepository } from 'src/core/domain/calendar-bot/tasks/tasks.repository';
import { TaskModel } from './schema';
import { UserId } from 'src/core/domain/auth/users/value-objects/id';
import { TaskId } from 'src/core/domain/calendar-bot/tasks/value-objects/id';



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
      TaskId.fromExisting(mongoTask.id)
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
        user_id:task.userId.value

    });
    await createdTask.save();
  }

  async getForUserAndDaterange(userId: string, date1: string, date2: string): Promise<Task[]> {
    const domainTasks = [];
    
    // Crear las fechas en formato de cadena 'YYYY-MM-DD'
    const startDate = new Date(date1).toISOString().split("T")[0];
    const endDate = new Date(date2).toISOString().split("T")[0];

    const tasks = await this.taskModel
      .find({
        user_id: userId, 
        date: {
          $gte: startDate, 
          $lte: endDate, 
        },
      })
      .exec();

    for (let i = 0; i < tasks.length; i++) {
        const task = this.mapToDomainTask(tasks[i]);
        domainTasks.push(task);
    }

    return domainTasks;
}


  async delete(task_id: string) {
      await this.taskModel.deleteOne({id:task_id});
  }

  async findById(task_id: string): Promise<Task> {
    console.log(`mongo lookinf for id:${task_id}`)
      const mongoTask = await this.taskModel.findOne({id:task_id})
      console.log(`task to edit: ${mongoTask}`)
      const domainTask = this.mapToDomainTask(mongoTask);

     return domainTask;
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
