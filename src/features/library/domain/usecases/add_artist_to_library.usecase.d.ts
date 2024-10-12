import { ArtistEntity } from '../entities/artist.entity';

export interface IAddArtistToLibraryUsecase {
  exec(artist: ArtistEntity, userId: string): Promise<void>;
}
