import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IGetLibraryItemUsecase {
  exec<T>(id: string): Promise<LibraryItemEntity<T> | null>;
}
