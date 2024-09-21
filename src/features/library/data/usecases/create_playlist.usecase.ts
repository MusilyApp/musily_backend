import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { ICreatePlaylistUsecase } from '../../domain/usecases/create_playlist.usecase';

export class CreatePlaylistUsecase implements ICreatePlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(playlist: PlaylistEntity): Promise<PlaylistEntity> {
    const createdPlaylist =
      await this.props.libraryRepository.createPlaylist(playlist);
    return createdPlaylist;
  }
}
