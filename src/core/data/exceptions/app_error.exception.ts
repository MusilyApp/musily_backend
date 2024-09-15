import { IAppError } from '../../domain/exceptions/app_error.exception';

export abstract class AppError implements IAppError {
  abstract error: string;
  abstract message?: string;
  abstract code?: number;

  extractError() {
    return {
      error: this.error,
      message: this.message,
    };
  }
}
