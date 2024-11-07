import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IUpdateLibraryItemUsecase {
  exec(item: LibraryItemEntity, userId: string): Promise<LibraryItemEntity>;
}
