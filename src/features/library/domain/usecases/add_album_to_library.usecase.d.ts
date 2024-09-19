import { AlbumEntity } from '../entities/album.entity';

export interface IAddAlbumToLibraryUsecase {
  exec(album: AlbumEntity): Promise<void>;
}
