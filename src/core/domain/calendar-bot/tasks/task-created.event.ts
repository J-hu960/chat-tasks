import { DomainEvent } from "../../domain-event"
import { Id } from "../../id"
import { Task } from "./task"
import { TaskId } from "./value-objects/id"
import { TaskTitle } from "./value-objects/title"

export type TaskCreatedPayload = {
    id:string,
    user_id:string,
    title:string,
    description:string,
    date:string,
    duration:number,
    party_id?:string
}

export class TaskCreatedEvent extends DomainEvent<TaskCreatedPayload>{
    static Type = "task.created"
    private constructor(taskId:Id,payload:TaskCreatedPayload,){
        super(taskId,TaskCreatedEvent.Type,payload)
    }

    static fromTask(task:Task){
        return new TaskCreatedEvent( task.id,{
            id:task.id.value,
            user_id:task.userId.value,
            title:task.title.title,
            description:task.description.Description,
            date:task.date.getISODate(),
            duration:task.duration.toMinutes(),
            party_id:task.party_id.value
        }

        )
    }
}