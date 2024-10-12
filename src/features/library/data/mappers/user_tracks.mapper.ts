import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { SimplifiedAlbumEntity } from '../../domain/entities/simplified_album.entity';
import { SimplifiedArtistEntity } from '../../domain/entities/simplified_artist.entity';
import { UserTrackEntity } from '../../domain/entities/user_track.entity';
import { SimplifiedAlbumMapper } from './simplified_album.mapper';
import { SimplifiedArtistMapper } from './simplified_artist.mapper';

export class UserTracksMapper implements IModelMapper<UserTrackEntity> {
  private simplifiedArtistMapper = new SimplifiedArtistMapper();
  private simplifiedAlbumMapper = new SimplifiedAlbumMapper();

  fromObjectToEntity(object: Record<string, unknown>): UserTrackEntity {
    return {
      id: typeSafe.string(object.id),
      hash: typeSafe.string(object.hash),
      trackId: typeSafe.string(object.trackId),
      title: typeSafe.string(object.title),
      artist: this.simplifiedArtistMapper.fromObjectToEntity(
        object.artist as Record<string, unknown>,
      ),
      album: this.simplifiedAlbumMapper.fromObjectToEntity(
        object.album as Record<string, unknown>,
      ),
      libraryItem: typeSafe.string(object.libraryItem),
      createdAt: new Date(typeSafe.string(object.createdAt)),
    };
  }

  fromEntityToObject(entity: UserTrackEntity): Record<string, unknown> {
    return {
      id: entity.id,
      hash: entity.hash,
      trackId: entity.trackId,
      title: entity.title,
      artist: this.simplifiedArtistMapper.fromEntityToObject(entity.artist),
      album: this.simplifiedAlbumMapper.fromEntityToObject(entity.album),
      libraryItem: entity.libraryItem,
      createdAt: entity.createdAt.toISOString(),
    };
  }

  fromJson(json: string): UserTrackEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: UserTrackEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
