import { BadInputForTask } from "../excepcions/BadInputForTask.error";

export class TaskHour {
    
    private constructor( readonly hour: number) {}

    static create(hour:number){
        if (hour <= 0 || hour > 23) {
            throw BadInputForTask.withValue(hour);
          }

          return new TaskHour(hour)
    }
  
  
  }
  