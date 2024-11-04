import { ArtistEntity } from '../../domain/entities/artist.entity';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IAddArtistToLibraryUsecase } from '../../domain/usecases/add_artist_to_library.usecase';
import * as crypto from 'crypto';

export class AddArtistToLibraryUsecase implements IAddArtistToLibraryUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(artist: ArtistEntity, userId: string): Promise<LibraryItemEntity> {
    artist.topAlbums = [];
    artist.topSingles = [];
    artist.topTracks = [];
    const item = await this.props.libraryRepository.addToLibrary({
      id: crypto.randomUUID(),
      artist: artist,
      userId: userId,
      lastTimePlayed: new Date(),
      createdAt: new Date(),
    });
    return item;
  }
}
