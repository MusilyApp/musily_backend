import { AppError } from '../exceptions/app_error.exception';

export class InternalServerError extends AppError {
  code = 500;
  error = 'internal_server_error';
  message = 'Erro interno do servidor';
}
