import { CreatePlaylistDTO } from '../../domain/dtos/create_playlist.dto';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { ICreatePlaylistUsecase } from '../../domain/usecases/create_playlist.usecase';

export class CreatePlaylistUsecase implements ICreatePlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(
    playlist: CreatePlaylistDTO,
    userId: string,
  ): Promise<PlaylistEntity> {
    const createdPlaylist = await this.props.libraryRepository.createPlaylist(
      playlist,
      userId,
    );
    return createdPlaylist;
  }
}
