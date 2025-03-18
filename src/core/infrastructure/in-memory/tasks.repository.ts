import { NonExistingTaskError } from "../../domain/calendar-bot/tasks/excepcions/NonExistingTask.error";
import { Task } from "../../domain/calendar-bot/tasks/task";
import { TaskRepository } from "../../domain/calendar-bot/tasks/tasks.repository";
import { TaskDate } from "../../domain/calendar-bot/tasks/value-objects/date";

export class TaskRepositoryInmemory implements TaskRepository{
    private tasks:Task[] = [];

    save(task:Task){
        this.tasks.push(task);
    }

    getTasks(): Task[] {
        return this.tasks
    }

    async getForUserAndDaterange(userId:string,userParties:string[],date1:string,date2:string):Promise<Task[]>{
        const date1Obj = TaskDate.create(date1)
        const date2Obj = TaskDate.create(date2)
        let tasks:Task[] = [];
        for(let i = 0; i < this.tasks.length; i++){
            const task = this.tasks[i];

            if(task.userId.value===userId&& task.date>= date1Obj && task.date<= date2Obj){
                tasks.push(task);
            }
        }

        console.log(`found tasks: ${tasks}`)

        return tasks;

    }

    delete(task_id: string): void {
        console.log('deleting task w id = ',task_id)
        const index = this.tasks.findIndex(task => task.id.value === task_id);
    
        if (index === -1) {
            throw NonExistingTaskError.withId(task_id);
        }
    
        this.tasks.splice(index, 1);
    }

    update(task: Task): void {
        const index = this.tasks.findIndex(existingTask => existingTask.id.value === task.id.value);

        if (index === -1) {
            throw new NonExistingTaskError(task.id.value);
        }

        this.tasks[index] = task;
    }

    async findById(task_id: string): Promise<Task> {
        const idx =  this.tasks.findIndex(task => task.id.value === task_id)

        return this.tasks[idx]


    }

    getNewActivityForUser(userId: string, user_partiesIds: string[], user_last_check: Date): Promise<Task[]> {
        return 
    }
    


}