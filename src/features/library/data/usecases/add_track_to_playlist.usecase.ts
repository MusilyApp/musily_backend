import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IAddTrackToPlaylistUsecase } from '../../domain/usecases/add_track_to_playlist.usecase';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';

export class AddTrackToPlaylistUsecase implements IAddTrackToPlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(track: TrackEntity, playlistId: string): Promise<void> {
    const libraryItem =
      await this.props.libraryRepository.getLibraryItem(playlistId);

    if (!libraryItem.playlist) {
      throw new PlaylistNotFoundError();
    }

    await this.props.libraryRepository.addTrackToPlaylist(track, playlistId);
  }
}
