import { UserTrackEntity } from '../../domain/entities/user_track.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IAddTrackToPlaylistUsecase } from '../../domain/usecases/add_track_to_playlist.usecase';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';

export class AddTrackToPlaylistUsecase implements IAddTrackToPlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(track: UserTrackEntity): Promise<void> {
    const libraryItem = await this.props.libraryRepository.getLibraryItem(
      track.libraryItem,
    );

    if (!libraryItem?.playlist) {
      throw new PlaylistNotFoundError();
    }

    await this.props.libraryRepository.addTrackToPlaylist(track);
  }
}
