// src/infrastructure/logger.service.ts
import { Logger as NestLogger, Injectable } from '@nestjs/common';
import { Logger } from 'src/core/domain/logger.interface';
@Injectable()
export class LoggerService implements Logger {
  private logger = new NestLogger();

  log(message: string): void {
    this.logger.log(message);
  }

  error(message: string, trace: string): void {
    this.logger.error(message, trace);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  verbose(message: string): void {
    this.logger.verbose(message);
  }
}
