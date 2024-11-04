import { ArtistEntity } from '../entities/artist.entity';
import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IAddArtistToLibraryUsecase {
  exec(artist: ArtistEntity, userId: string): Promise<LibraryItemEntity>;
}
