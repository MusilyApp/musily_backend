import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class InvalidUserIdError extends AppError {
  public code = 400;
  public error = 'user.invalid_user_id';
  public message = 'ID de usuário inválido.';
}
