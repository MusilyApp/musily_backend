import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { UserTrackEntity } from '../../domain/entities/user_track.entity';

export class UserTracksMapper implements IModelMapper<UserTrackEntity> {
  fromJsonDataToEntity(jsonData: Record<string, any>): UserTrackEntity {
    return {
      id: jsonData.id,
      hash: jsonData.hash,
      trackId: jsonData.trackId,
      title: jsonData.title,
      artist: jsonData.artist,
      album: jsonData.album,
      libraryItem: jsonData.libraryItem,
      createdAt: jsonData.createdAt,
    };
  }
}
