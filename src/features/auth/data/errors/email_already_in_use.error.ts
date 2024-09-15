import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class EmailAlreadyInUseError extends AppError {
  public code = 400;
  public error = 'auth.email_already_in_use';
  public message = 'E-mail already in use.';
}
