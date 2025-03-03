import { Task } from "src/core/domain/conversations/tasks/task";
import { TaskRepository } from "src/core/domain/conversations/tasks/tasks.repository";
import { TaskDate } from "src/core/domain/conversations/tasks/value-objects/date";

export class TaskRepositoryInmemory implements TaskRepository{
    readonly tasks:Task[] = [];

    save(task:Task){
        this.tasks.push(task);
    }

    getTasks(): Task[] {
        return this.tasks
    }

    getForUserAndDaterange(userId:string,date1:string,date2:string):Task[]{
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


}