import { UpdatePlaylistDTO } from '../dtos/update_playlist.dto';
import { PlaylistEntity } from '../entities/playlist.entity';

export interface IUpdatePlaylistUsecase {
  exec(
    playlist: UpdatePlaylistDTO,
    userId: string,
  ): Promise<PlaylistEntity | undefined>;
}
