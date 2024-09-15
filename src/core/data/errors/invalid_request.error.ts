import { AppError } from '../exceptions/app_error.exception';

export class InvalidRequestError extends AppError {
  public code = 400;
  public error = 'invalid_request';
  public message = 'Requisição inválida';
}
