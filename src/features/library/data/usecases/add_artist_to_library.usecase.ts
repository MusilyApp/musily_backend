import { ArtistEntity } from '../../domain/entities/artist.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IAddArtistToLibraryUsecase } from '../../domain/usecases/add_artist_to_library.usecase';

export class AddArtistToLibraryUsecase implements IAddArtistToLibraryUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(artist: ArtistEntity): Promise<void> {
    await this.props.libraryRepository.addToLibrary({
      id: crypto.randomUUID(),
      artist: artist,
      lastTimePlayed: new Date(),
    });
  }
}
