import { Task } from "./task";

export interface TaskRepository{
    save(task:Task):void;
    getTasks():Task[];
    getForUserAndDaterange(userId:string,date1:string,date2:string):Task[];
}

export const TASK_REPOSITORY = Symbol('task-repository')