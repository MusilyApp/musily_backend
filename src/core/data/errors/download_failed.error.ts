import { AppError } from '../exceptions/app_error.exception';

export class DownloadFailedError extends AppError {
  code = 500;
  error = 'storage.download_failed';
  message = 'O download do arquivo falhou';
}
