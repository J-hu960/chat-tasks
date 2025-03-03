import { HttpStatus } from "@nestjs/common"
import { BaseError } from "./error"

export class InvalidIdError extends BaseError {
   constructor(message: string) {
    super(HttpStatus.BAD_REQUEST.toString(), message)
  }

  static withInvalidValue(id: string): InvalidIdError {
    return new InvalidIdError(`Invalid id: ${id}`)
  }
}