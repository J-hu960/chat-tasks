import { BadInputForTask } from "../excepcions/BadInputForTask.error";

export class TaskDescription{
    private constructor(readonly Description:string){}


    static create(description:string){
        if(description.length > 500 || description.length < 3){
            throw BadInputForTask.withValue(description);
        }

        return new TaskDescription(description);
    }
}