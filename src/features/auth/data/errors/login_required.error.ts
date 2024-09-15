import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class LoginRequiredError extends AppError {
  public code = 401;
  public error = 'auth.login_required';
  public message = 'Login required';
}
