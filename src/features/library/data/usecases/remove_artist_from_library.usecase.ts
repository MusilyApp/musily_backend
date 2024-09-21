import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IRemoveArtistFromLibraryUsecase } from '../../domain/usecases/remove_artist_from_library.usecase';

export class RemoveArtistFromLibraryUsecase
  implements IRemoveArtistFromLibraryUsecase
{
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(libraryItemId: string): Promise<void> {
    await this.props.libraryRepository.removeFromLibrary(libraryItemId);
  }
}
