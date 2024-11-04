import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IGetLibraryItemUsecase {
  exec(id: string, userId: string): Promise<LibraryItemEntity | null>;
}
