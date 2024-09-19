import { PlaylistEntity } from '../entities/playlist.entity';

export interface IUpdatePlaylistUsecase {
  exec(playlist: PlaylistEntity): Promise<PlaylistEntity>;
}
