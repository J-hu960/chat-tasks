import { BadInputForTask } from "../excepcions/BadInputForTask.error";

export class TaskDate {
  
    private constructor( readonly date: string) {}

    static create(date:string){
      const parsedDate = new Date(date);
  
      if (isNaN(parsedDate.getTime())) {
        throw BadInputForTask.withValue(date);
      }

      const formatted = parsedDate.toISOString().split("T")[0];

      return new TaskDate(formatted)
  

    }


  
    toString() {
      return this.date;
    }
  
    equals(other: TaskDate) {
      return this.date === other.date;
    }
  
    getISODate() {
      return this.date;
    }
  }
  