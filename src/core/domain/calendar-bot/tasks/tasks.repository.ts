import { Task } from "./task";

export interface TaskRepository{
    save(task:Task):void;
    getForUserAndDaterange(userId:string,date1:string,date2:string):Promise<Task[]>;
    delete(task_id:string):void;
    findById(task_id:string):Promise<Task>;
    update(task:Task):void
}

export const TASK_REPOSITORY = Symbol('task-repository')