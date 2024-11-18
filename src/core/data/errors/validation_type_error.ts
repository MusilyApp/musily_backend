import { AppError } from '../exceptions/app_error.exception';

export class ValidationTypeError extends AppError {
  error = 'invalid_request';
  message?: string;
  code = 500;

  constructor(invalidType: string) {
    super();
    this.message = `Erro ao validar tipo em: ${invalidType}`;
  }
}
