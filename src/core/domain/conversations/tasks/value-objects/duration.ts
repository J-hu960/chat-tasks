import { BadInputForTask } from "../excepcions/BadInputForTask.error";

export class TaskDuration {
    
    private constructor(private readonly minutes: number) {}

    static create(minutes:number){
        if (minutes <= 0) {
            throw BadInputForTask.withValue(minutes);
          }

          return new TaskDuration(minutes)
    }
  
    toMinutes() {
      return this.minutes;
    }
  
    toHours() {
      return this.minutes / 60;
    }
  
    toString() {
      return this.minutes >= 60
        ? `${this.toHours()} horas`
        : `${this.minutes} minutos`;
    }
  
    equals(other: TaskDuration) {
      return this.minutes === other.minutes;
    }
  }
  