import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';

export class LibraryItemMapper implements IModelMapper<LibraryItemEntity> {
  fromJsonDataToEntity(jsonData: Record<string, any>): LibraryItemEntity {
    return {
      id: jsonData.id,
      userId: jsonData.userId,
      lastTimePlayed: jsonData.lastTimePlayed,
      album: jsonData.album,
      artist: jsonData.artist,
      playlist: jsonData.playlist,
      createdAt: jsonData.createdAt,
    };
  }
}
