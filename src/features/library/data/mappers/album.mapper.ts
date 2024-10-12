import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { TrackMapper } from '../../../data_fetch/data/mappers/track.mapper';
import { AlbumEntity } from '../../domain/entities/album.entity';
import { ArtistMapper } from './artist.mapper';
import { SimplifiedArtistMapper } from './simplified_artist.mapper';

export class AlbumMapper implements IModelMapper<AlbumEntity> {
  private artistMapper = new ArtistMapper();
  private simplifiedArtistMapper = new SimplifiedArtistMapper();
  private trackMapper = new TrackMapper();

  fromObjectToEntity(object: Record<string, unknown>): AlbumEntity {
    return {
      id: typeSafe.string(object.id),
      title: typeSafe.string(object.title),
      releaseDate: new Date(typeSafe.string(object.releaseDate)),
      artist: this.artistMapper.fromObjectToEntity(
        object.artist as Record<string, unknown>,
      ),
      tracks: (object.tracks as []).map((e) =>
        this.trackMapper.fromObjectToEntity(e as Record<string, unknown>),
      ),
    };
  }
  fromEntityToObject(entity: AlbumEntity): Record<string, unknown> {
    return {
      id: entity.id,
      title: entity.title,
      releaseDate: entity.releaseDate.toISOString(),
      artist: this.simplifiedArtistMapper.fromEntityToObject(entity.artist),
      tracks: entity.tracks.map((e) => this.trackMapper.fromEntityToObject(e)),
    };
  }
  fromJson(json: string): AlbumEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }
  toJson(entity: AlbumEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
