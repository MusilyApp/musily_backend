import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IGetLibraryItemUsecase } from '../../domain/usecases/get_library_item.usecase';

export class GetLibraryItemUsecase implements IGetLibraryItemUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(id: string, userId: string): Promise<LibraryItemEntity | null> {
    const libraryItem = await this.props.libraryRepository.getLibraryItem(
      id,
      userId,
    );
    return libraryItem;
  }
}
