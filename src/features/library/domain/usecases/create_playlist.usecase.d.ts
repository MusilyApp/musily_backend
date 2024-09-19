import { PlaylistEntity } from '../entities/playlist.entity';

export interface ICreatePlaylist {
  exec(playlist: Partial<PlaylistEntity>): Promise<PlaylistEntity>;
}
