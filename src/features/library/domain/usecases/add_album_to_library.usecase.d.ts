import { AlbumEntity } from '../entities/album.entity';
import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IAddAlbumToLibraryUsecase {
  exec(album: AlbumEntity, userId: string): Promise<LibraryItemEntity>;
}
