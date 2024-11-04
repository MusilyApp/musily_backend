import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IDeletePlaylistUsecase } from '../../domain/usecases/delete_playlist.usecase';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';

export class DeletePlaylistUsecase implements IDeletePlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(playlistId: string, userId: string): Promise<void> {
    const playlist = await this.props.libraryRepository.getLibraryItem(
      playlistId,
      userId,
    );
    if (!playlist) {
      throw new PlaylistNotFoundError();
    }
    await this.props.libraryRepository.deletePlaylist(playlistId);
  }
}
