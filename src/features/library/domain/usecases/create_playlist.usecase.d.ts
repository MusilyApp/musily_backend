import { PlaylistEntity } from '../entities/playlist.entity';

export interface ICreatePlaylistUsecase {
  exec(playlist: PlaylistEntity, userId: string): Promise<PlaylistEntity>;
}
