import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class InvalidCredentialsError extends AppError {
  public code = 400;
  public error = 'auth.invalid_credentials';
  public message = 'Invalid credentials.';
}
