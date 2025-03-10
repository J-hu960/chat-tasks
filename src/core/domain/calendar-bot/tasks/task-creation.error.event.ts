import { DomainEvent } from "../../domain-event"
import { Id } from "../../id"
import { Task } from "./task"
import { TaskId } from "./value-objects/id"
import { TaskTitle } from "./value-objects/title"

export type TaskCreatedPayload = {
    id:string,
    user_id:string,
    message:string
}

export class TaskCreationEvent extends DomainEvent<TaskCreatedPayload>{
    static Type = "task.error"
    private constructor(taskId:Id,payload:TaskCreatedPayload,){
        super(taskId,TaskCreationEvent.Type,payload)
    }

    static withMessage(task:Task,msg:string){
        return new TaskCreationEvent( task.id,{
            id:task.id.value,
            user_id:task.userId.value,
            message:msg
        }

        )
    }
}