import { symbol } from "zod";

export interface Logger {
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
  }

export const LOGGER_SYMBOL = Symbol("logger")