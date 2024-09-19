import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IGetLibraryUsecase {
  exec<T>(userId: string): Promise<LibraryItemEntity<T>>;
}
