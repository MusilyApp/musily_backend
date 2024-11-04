import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class UserNotFoundError extends AppError {
  public code = 404;
  public error = 'user.user_not_found';
  public message = 'Usuário não encontrado';
}
