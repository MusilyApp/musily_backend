import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { SimplifiedAlbumEntity } from '../../domain/entities/simplified_album.entity';

export class SimplifiedAlbumMapper
  implements IModelMapper<SimplifiedAlbumEntity>
{
  fromObjectToEntity(object: Record<string, unknown>): SimplifiedAlbumEntity {
    return {
      id: typeSafe.string(object.id),
      title: typeSafe.string(object.title),
    };
  }

  fromEntityToObject(entity: SimplifiedAlbumEntity): Record<string, unknown> {
    return {
      id: entity.id,
      title: entity.title,
    };
  }

  fromJson(json: string): SimplifiedAlbumEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: SimplifiedAlbumEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
