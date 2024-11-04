import { CreatePlaylistDTO } from '../dtos/create_playlist.dto';
import { PlaylistEntity } from '../entities/playlist.entity';

export interface ICreatePlaylistUsecase {
  exec(playlist: CreatePlaylistDTO, userId: string): Promise<PlaylistEntity>;
}
