export abstract class BaseError extends Error {
  constructor(
    readonly code: string,
    readonly message: string
  ) {
    super(message);
  }
}
