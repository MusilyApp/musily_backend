import { AppError } from '../../../../core/data/exceptions/app_error.exception';

export class PlaylistNotFoundError extends AppError {
  error = 'library.playlist_not_found';
  message = 'Playlist not found.';
  code = 404;
}
