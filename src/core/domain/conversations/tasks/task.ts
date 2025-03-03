import { AggregateRoot } from "../../aggregate-root";
import { Id } from "../../id";
import { UserId } from "../users/value-objects/id";
import { TaskCreatedEvent } from "./task-created.event";
import { TaskDate } from "./value-objects/date";
import { TaskDescription } from "./value-objects/description";
import { TaskDuration } from "./value-objects/duration";
import { TaskHour } from "./value-objects/hour";
import { TaskId } from "./value-objects/id";
import { TaskTitle } from "./value-objects/title";

export class Task extends AggregateRoot{
    private constructor(
        readonly id:TaskId,
        readonly userId:UserId,
        readonly title:TaskTitle,
        readonly description:TaskDescription,
        readonly date:TaskDate,
        readonly duration:TaskDuration,
        readonly hour:TaskHour
    ){
        super()
    }
    static create(userId:UserId,titleStr:string,descriptionstr:string, dateStr:string,durationMinutes:number,hourInt:number){
        const id = TaskId.new();
        const title = TaskTitle.create(titleStr);
        const description = TaskDescription.create(descriptionstr);
        const date = TaskDate.create(dateStr);
        const duration = TaskDuration.create(durationMinutes);
        const hour = TaskHour.create(hourInt)

        const task = new Task(id,userId,title,description,date,duration,hour);

        task.recordEvent(TaskCreatedEvent.fromTask(task)) //Registrar evento de crear TASK

        return task



    }
}