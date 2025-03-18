import { Task } from "./task";

export interface TaskRepository{
    save(task:Task):void;
    getForUserAndDaterange(userId:string,user_partiesIds:string[],date1:string,date2:string):Promise<Task[]>;
    delete(task_id:string):void;
    findById(task_id:string):Promise<Task>;
    update(task:Task):void;
    getNewActivityForUser(userId: string,user_partiesIds:string[],user_last_check:Date,): Promise<Task[]>;
}

export const TASK_REPOSITORY = Symbol('task-repository')