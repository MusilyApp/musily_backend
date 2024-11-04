import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IAddTracksToPlaylistUsecase } from '../../domain/usecases/add_tracks_to_playlist.usecase';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';

export class AddTracksToPlaylistUsecase implements IAddTracksToPlaylistUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(
    tracks: TrackEntity[],
    playlistId: string,
    userId: string,
  ): Promise<void> {
    if (!tracks.length) {
      return;
    }
    const libraryItem = await this.props.libraryRepository.getLibraryItem(
      playlistId,
      userId,
    );

    if (!libraryItem?.playlist) {
      throw new PlaylistNotFoundError();
    }

    await this.props.libraryRepository.addTracksToPlaylist(
      tracks,
      playlistId,
      userId,
    );
  }
}
