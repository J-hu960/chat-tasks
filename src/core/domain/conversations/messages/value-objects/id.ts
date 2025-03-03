import { Id } from "../../../id";

export class MessageId extends Id{
    private constructor(value: string) {
        super(value)
      }
    
      static new(): MessageId {
        return new MessageId(this.generate())
      }
}