import { AppError } from '../exceptions/app_error.exception';

export class InvalidFirebaseCertsError extends AppError {
  code = 500;
  error = 'firebase_adapter.invalid_certs_directory';
  message = 'Certificado firebase inválido';
}
