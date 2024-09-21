import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IGetLibraryItemUsecase {
  exec(id: string): Promise<LibraryItemEntity | null>;
}
