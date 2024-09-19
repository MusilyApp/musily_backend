import { ArtistEntity } from '../entities/artist.entity';

export interface IAddArtistToLibraryUsecase {
  exec(artist: ArtistEntity): Promise<void>;
}
