import { LibraryItemEntity } from '../entities/library_item.entity';

export interface IGetLibraryUsecase {
  exec(userId: string): Promise<LibraryItemEntity[]>;
}
