import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { UserTrackEntity } from '../entities/user_track.entity';

export interface IAddTracksToPlaylistUsecase {
  exec(tracks: UserTrackEntity[], playlistId: string): Promise<void>;
}
