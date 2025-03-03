import { Id } from "../../../id";

export class UserId extends Id{
    private constructor(value: string) {
        super(value)
      }
    
      static new(): UserId {
        return new UserId(this.generate())
      }
}