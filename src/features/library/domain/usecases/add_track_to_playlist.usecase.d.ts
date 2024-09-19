import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';

export interface IAddTrackToPlaylistUsecase {
  exec(track: TrackEntity, playlistId: string): Promise<void>;
}
