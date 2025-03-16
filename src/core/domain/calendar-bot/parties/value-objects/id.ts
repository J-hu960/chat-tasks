import { Id } from "../../../id";

export class PartyId extends Id{
    private constructor(value: string) {
        super(value)
      }
    
      static new(): PartyId {
        return new PartyId(this.generate())
      }
      static fromExisting(id: string): Id {
        return new PartyId(id)
      }
}