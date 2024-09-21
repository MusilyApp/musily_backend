import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IUpdatePlaylistUsecase } from '../../domain/usecases/update_playlist.usecase';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';

export class UpdatePlaylistUsecase implements IUpdatePlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(playlist: PlaylistEntity): Promise<PlaylistEntity> {
    const existingPlaylist = await this.props.libraryRepository.getLibraryItem(
      playlist.id,
    );
    if (!existingPlaylist) {
      throw new PlaylistNotFoundError();
    }
    const updatedPlaylist =
      await this.props.libraryRepository.updatePlaylist(playlist);
    return updatedPlaylist;
  }
}
