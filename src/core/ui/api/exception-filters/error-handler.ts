// src/infrastructure/exception-filters/ErrorHandler.ts
import { Response } from 'express';
import { ERROR_MAP } from './ErrorMap';
import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/domain/error';

export class ErrorResponse {
  code: string;
  message: string;

  static fromBaseError(error: BaseError): ErrorResponse {
    return {
      code: error.code,
      message: error.message,
    };
  }

  static internalServerError(error: Error): ErrorResponse {
    return {
      code: 'internal-server-error',
      message: error.message,
    };
  }
}

export const catchError = (error: Error, response: Response) => {
  if (!(error instanceof BaseError)) {
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorResponse.internalServerError(error));
    return;
  }

  const status = ERROR_MAP.get(error.constructor as any) || HttpStatus.INTERNAL_SERVER_ERROR;
  response.status(status).json(ErrorResponse.fromBaseError(error));
};
