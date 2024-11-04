import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { SimplifiedAlbumMapper } from '../../../library/data/mappers/simplified_album.mapper';
import { SimplifiedArtistMapper } from '../../../library/data/mappers/simplified_artist.mapper';
import { TrackEntity } from '../../domain/entities/track.entity';

export class TrackMapper implements IModelMapper<TrackEntity> {
  private simplifiedArtistMapper = new SimplifiedArtistMapper();
  private simplifiedAlbumMapper = new SimplifiedAlbumMapper();

  fromObjectToEntity(object: Record<string, unknown>): TrackEntity {
    return {
      id: typeSafe.string(object.id),
      trackId: typeSafe.string(object.trackId),
      title: typeSafe.string(object.title),
      hash: typeSafe.string(object.hash),
      highResImg: typeSafe.stringOptional(object.highResImg),
      lowResImg: typeSafe.stringOptional(object.lowResImg),
      artist: this.simplifiedArtistMapper.fromObjectToEntity(
        object.artist as Record<string, unknown>,
      ),
      album: this.simplifiedAlbumMapper.fromObjectToEntity(
        object.album as Record<string, unknown>,
      ),
    };
  }

  fromEntityToObject(entity: TrackEntity): Record<string, unknown> {
    return {
      id: entity.id,
      trackId: entity.trackId,
      title: entity.title,
      hash: entity.hash,
      highResImg: entity.highResImg,
      lowResImg: entity.lowResImg,
      artist: this.simplifiedArtistMapper.fromEntityToObject(entity.artist),
      album: this.simplifiedAlbumMapper.fromEntityToObject(entity.album),
    };
  }

  fromJson(json: string): TrackEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: TrackEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
