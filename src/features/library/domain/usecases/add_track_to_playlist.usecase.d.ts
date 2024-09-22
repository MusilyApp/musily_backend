import { UserTrackEntity } from '../entities/user_track.entity';

export interface IAddTrackToPlaylistUsecase {
  exec(track: UserTrackEntity): Promise<void>;
}
