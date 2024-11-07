import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IUpdateLibraryItemUsecase } from '../../domain/usecases/update_library_item.usecase';

export class UpdateLibraryItemUsecase implements IUpdateLibraryItemUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}

  async exec(
    item: LibraryItemEntity,
    userId: string,
  ): Promise<LibraryItemEntity> {
    return this.props.libraryRepository.updateLibraryItem(item, userId);
  }
}
