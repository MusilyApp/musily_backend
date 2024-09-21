import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IRemoveAlbumFromLibraryUsecase } from '../../domain/usecases/remove_album_from_library.usecase';

export class RemoveAlbumFromLibraryUsecase
  implements IRemoveAlbumFromLibraryUsecase
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
