import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { TrackMapper } from '../../../data_fetch/data/mappers/track.mapper';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { SimplifiedArtistMapper } from './simplified_artist.mapper';

export class PlaylistMapper implements IModelMapper<PlaylistEntity> {
  private simplifiedArtistMapper = new SimplifiedArtistMapper();
  private trackMapper = new TrackMapper();

  fromObjectToEntity(object: Record<string, unknown>): PlaylistEntity {
    return {
      id: typeSafe.string(object.id),
      title: typeSafe.string(object.title),
      trackCount: typeSafe.number(object.trackCount)
        ? typeSafe.number(object.trackCount)
        : 0,
      tracks: object.tracks
        ? typeSafe
            .array(object.tracks)
            .map((e) =>
              this.trackMapper.fromObjectToEntity(e as Record<string, unknown>),
            )
        : undefined,
      artist: !object.artist
        ? undefined
        : this.simplifiedArtistMapper.fromObjectToEntity(
            object.artist as Record<string, unknown>,
          ),
    };
  }

  fromEntityToObject(entity: PlaylistEntity): Record<string, unknown> {
    return {
      id: entity.id,
      title: entity.title,
      track_count: entity.trackCount,
      tracks: entity.tracks,
      artist: entity.artist
        ? this.simplifiedArtistMapper.fromEntityToObject(entity.artist)
        : undefined,
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
