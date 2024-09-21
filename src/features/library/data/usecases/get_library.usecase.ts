import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IGetLibraryUsecase } from '../../domain/usecases/get_library.usecase';

export class GetLibraryUsecase implements IGetLibraryUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(userId: string): Promise<LibraryItemEntity[]> {
    const library = await this.props.libraryRepository.getLibrary(userId);
    return library;
  }
}
