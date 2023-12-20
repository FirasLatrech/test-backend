// utils/AppError.ts
export default class AppError extends Error {
  constructor(message: string, public statusCode: number, public status: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
