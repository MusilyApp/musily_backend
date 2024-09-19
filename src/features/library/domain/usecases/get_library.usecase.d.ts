import { LibraryItemEntity } from '../entities/library_item.entity';

export interface GetLibraryUsecase {
  exec<T>(userId: string): Promise<LibraryItemEntity<T>>;
}
