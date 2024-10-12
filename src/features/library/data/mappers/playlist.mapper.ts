import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { ArtistEntity } from '../../domain/entities/artist.entity';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { ArtistMapper } from './artist.mapper';

export class PlaylistMapper implements IModelMapper<PlaylistEntity> {
  private artistMapper = new ArtistMapper();

  fromObjectToEntity(object: Record<string, unknown>): PlaylistEntity {
    return {
      id: typeSafe.string(object.id),
      title: typeSafe.string(object.title),
      track_count: typeSafe.boolean(object.track_count)
        ? typeSafe.number(object.track_count)
        : 0,
      artist: !object.artist
        ? null
        : this.artistMapper.fromObjectToEntity(
            object.artist as Record<string, unknown>,
          ),
    };
  }

  fromEntityToObject(entity: PlaylistEntity): Record<string, unknown> {
    return {
      id: entity.id,
      title: entity.title,
      track_count: entity.track_count,
      artist: entity.artist
        ? this.artistMapper.fromEntityToObject(entity.artist)
        : null,
    };
  }

  fromJson(json: string): PlaylistEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: PlaylistEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
