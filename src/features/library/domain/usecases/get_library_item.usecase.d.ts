import { LibraryItemEntity } from '../entities/library_item.entity';

export interface GetLibraryItemUsecase {
  exec<T>(id: string): Promise<LibraryItemEntity<T> | null>;
}
