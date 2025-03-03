import { v4 as uuidv4 } from 'uuid'
import { validate as uuidValidate } from 'uuid'
import { InvalidIdError } from './invalid-id.error'

export  class Id {
  protected constructor(readonly value: string) {}
  static generate(): string {
    return uuidv4()
  }
  static createRandom():Id{
    return new Id(uuidv4());
  }

  protected static guardValidId(value: string): void {
    if (!uuidValidate(value)) {
      throw InvalidIdError.withInvalidValue(value)
    }
  }

  equals(id: Id): boolean {
    return id.value === this.value
  }

  static fromExisting(id:string){
    if (!uuidValidate(id)) {
      throw InvalidIdError.withInvalidValue(id)
    }

    return new Id(id)

  }
}