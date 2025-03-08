import { BaseError } from "src/core/domain/error";


export class NonExistingTaskError extends BaseError{
    constructor(task_id:string){
        super('no-task-found',`cannot find task for given id :${task_id}`)
    }

    static withId(task_id:string){
        return new NonExistingTaskError(task_id);
    }

}