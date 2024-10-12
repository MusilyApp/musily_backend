import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { SimplifiedArtistEntity } from '../../domain/entities/simplified_artist.entity';

export class SimplifiedArtistMapper
  implements IModelMapper<SimplifiedArtistEntity>
{
  fromObjectToEntity(object: Record<string, unknown>): SimplifiedArtistEntity {
    return {
      id: typeSafe.string(object.id),
      name: typeSafe.string(object.name),
    };
  }

  fromEntityToObject(entity: SimplifiedArtistEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name,
    };
  }

  fromJson(json: string): SimplifiedArtistEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: SimplifiedArtistEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
