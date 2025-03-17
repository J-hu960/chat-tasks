import { AggregateRoot } from "../../aggregate-root";
import { Id } from "../../id";
import { UserId } from "../../auth/users/value-objects/id";
import { TaskCreatedEvent } from "./task-created.event";
import { TaskDate } from "./value-objects/date";
import { TaskDescription } from "./value-objects/description";
import { TaskDuration } from "./value-objects/duration";
import { TaskHour } from "./value-objects/hour";
import { TaskId } from "./value-objects/id";
import { TaskTitle } from "./value-objects/title";
import { UpdateTaskCommand } from "src/core/application/calendar-bot/tasks/update-task/update-task.command";
import { PartyId } from "../parties/value-objects/id";

export class Task extends AggregateRoot{
    private constructor(
        readonly id:TaskId,
        readonly userId:UserId,
        readonly title:TaskTitle,
        readonly description:TaskDescription,
        readonly date:TaskDate,
        readonly duration:TaskDuration,
        readonly hour:TaskHour,
        readonly party_id?:PartyId
    ){
        super()
    }
    static create(userId:UserId,titleStr:string,descriptionstr:string, dateStr:string,durationMinutes:number,hourInt:number,party_id?:PartyId,task_id?:TaskId,){
        const id = task_id || TaskId.new();
        const title = TaskTitle.create(titleStr);
        const description = TaskDescription.create(descriptionstr);
        const date = TaskDate.create(dateStr);
        const duration = TaskDuration.create(durationMinutes);
        const hour = TaskHour.create(hourInt)

        const task = new Task(id,userId,title,description,date,duration,hour,party_id);

        task.recordEvent(TaskCreatedEvent.fromTask(task)) 

        return task



    }
    static fromCommand(command:UpdateTaskCommand){
        const id = TaskId.fromExisting(command.task_id);
        const user_id = UserId.fromExisting(command.user_id);
        const title = TaskTitle.create(command.title);
        const description = TaskDescription.create(command.description);
        const hour = TaskHour.create(command.hour);
        const duration = TaskDuration.create(command.duration);
        const date = TaskDate.create(command.date)

        return new Task(id,user_id,title,description,date,duration,hour);

    }

}