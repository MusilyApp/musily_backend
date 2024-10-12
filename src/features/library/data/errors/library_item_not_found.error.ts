import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class LibraryItemNotFoundError extends AppError {
  code = 404;
  message = 'Library item not found.';
  error = 'library.item_not_found';
}
