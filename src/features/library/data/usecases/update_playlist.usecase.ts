import { UpdatePlaylistDTO } from '../../domain/dtos/update_playlist.dto';
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
  async exec(
    playlist: UpdatePlaylistDTO,
    userId: string,
  ): Promise<PlaylistEntity | undefined> {
    const existingPlaylist = await this.props.libraryRepository.getLibraryItem(
      playlist.id,
      userId,
    );
    if (!existingPlaylist) {
      throw new PlaylistNotFoundError();
    }
    const updatedPlaylist =
      await this.props.libraryRepository.updatePlaylist(playlist);
    return updatedPlaylist;
  }
}
