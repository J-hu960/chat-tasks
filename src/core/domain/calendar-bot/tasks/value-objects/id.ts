import { Id } from "../../../id";

export class TaskId extends Id{
    private constructor(value: string) {
        super(value)
      }
    
      static new(): TaskId {
        return new TaskId(this.generate())
      }

      static fromExisting(id: string): Id {
          return new TaskId(id)
      }
}