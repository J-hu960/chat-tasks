import { Response } from 'express'

import { InvalidIdError } from '../../domain/invalid-id.error'
import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../domain/error'
import { InvalidMessageLength } from 'src/core/domain/calendar-bot/messages/excepcions/InvalidMessageLength.error'
import { DuplicateMailError } from 'src/core/domain/auth/users/excepcions/DuplicateEmailError.error'
import { BadInputForUser } from 'src/core/domain/auth/users/excepcions/InvalidUserInput.error'
import { NonExistingUserError } from 'src/core/domain/auth/users/excepcions/NonExistingUser.error'
import { DeletionNotAuthorized } from 'src/core/domain/calendar-bot/tasks/excepcions/DeletionNotAuthorized'
import { NonExistingTaskError } from 'src/core/domain/calendar-bot/tasks/excepcions/NonExistingTask.error'

export class ErrorResponse {
  code: string
  message: string

  static fromBaseError(error: BaseError): ErrorResponse {
    return {
      code: error.code,
      message: error.message,
    }
  }

  static internalServerError(error: Error): ErrorResponse {
    return {
      code: 'internal-server-error',
      message: error.message,
    }
  }
}

export const catchError = (error: Error, response: Response) => {
  if (!(error instanceof BaseError)) {
    response.status(500).json(ErrorResponse.internalServerError(error))
    return
  }

  if (error instanceof InvalidIdError) {
    response.status(409).json(ErrorResponse.fromBaseError(error))
    return
  }


  if (error instanceof InvalidMessageLength) {
    response.status(HttpStatus.BAD_REQUEST).json(ErrorResponse.fromBaseError(error))
    return
  }


  if (error instanceof DuplicateMailError) {
    response.status(HttpStatus.BAD_REQUEST).json(ErrorResponse.fromBaseError(error))
    return
  }
  if (error instanceof BadInputForUser) {
    response.status(HttpStatus.BAD_REQUEST).json(ErrorResponse.fromBaseError(error))
    return
  }
  if (error instanceof NonExistingUserError) {
    response.status(HttpStatus.BAD_REQUEST).json(ErrorResponse.fromBaseError(error))
    return
  }

  if (error instanceof DeletionNotAuthorized) {
    response.status(HttpStatus.UNAUTHORIZED).json(ErrorResponse.fromBaseError(error))
    return
  }
  if (error instanceof NonExistingTaskError) {
    response.status(HttpStatus.NOT_FOUND).json(ErrorResponse.fromBaseError(error))
    return
  }
  
 
  

  response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorResponse.fromBaseError(error))


  
  

}