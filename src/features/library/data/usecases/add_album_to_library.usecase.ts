import { AlbumEntity } from '../../domain/entities/album.entity';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IAddAlbumToLibraryUsecase } from '../../domain/usecases/add_album_to_library.usecase';

export class AddAlbumToLibaryUsecase implements IAddAlbumToLibraryUsecase {
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(album: AlbumEntity, userId: string): Promise<LibraryItemEntity> {
    const item = await this.props.libraryRepository.addToLibrary({
      id: album.id,
      album: album,
      userId: userId,
      lastTimePlayed: new Date(),
      createdAt: new Date(),
    });
    return item;
  }
}
