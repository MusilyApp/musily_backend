import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';

export interface IAddTracksToPlaylistUsecase {
  exec(
    tracks: TrackEntity[],
    playlistId: string,
    userId: string,
  ): Promise<void>;
}
