import { BadInputForTask } from "../excepcions/BadInputForTask.error";
import { TaskCreationEvent } from "../task-creation.error.event";

export class TaskTitle{
    private constructor(readonly title:string){}


    static create(title:string){
        if(title.length > 50 || title.length < 1){
            throw BadInputForTask.withValue(title);
        }

        return new TaskTitle(title);
    }
}