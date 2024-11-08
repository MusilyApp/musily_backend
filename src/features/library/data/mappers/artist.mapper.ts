import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { ArtistEntity } from '../../domain/entities/artist.entity';

export class ArtistMapper implements IModelMapper<ArtistEntity> {
  // TODO fix call stack size exceed
  // private trackMapper = new TrackMapper();
  // private albumMapper = new AlbumMapper();

  fromObjectToEntity(object: Record<string, unknown>): ArtistEntity {
    return {
      id: typeSafe.string(object.id),
      name: typeSafe.string(object.name),
      highResImg: typeSafe.stringOptional(object.highResImg),
      lowResImg: typeSafe.stringOptional(object.lowResImg),
      topTracks: object.topTracks as [],
      topAlbums: object.topAlbums as [],
      topSingles: object.topSingles as [],
    };
  }

  fromEntityToObject(entity: ArtistEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name,
      highResImg: entity.highResImg,
      lowResImg: entity.lowResImg,
      topTracks: entity.topTracks,
      topAlbums: entity.topAlbums,
      topSingles: entity.topSingles,
    };
  }

  fromJson(json: string): ArtistEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: ArtistEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
