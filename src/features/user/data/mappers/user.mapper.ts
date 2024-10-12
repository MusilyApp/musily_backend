import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { UserEntity } from '../entities/user.entity';

export class UserMapper implements IModelMapper<UserEntity> {
  fromObjectToEntity(object: Record<string, unknown>): UserEntity {
    return new UserEntity({
      id: typeSafe.string(object.id),
      name: typeSafe.string(object.name),
      email: typeSafe.string(object.email),
      password: object.password ? typeSafe.string(object.password) : undefined,
      recoveryPhrase: typeSafe.string(object.recoveryPhrase),
      createdAt: new Date(typeSafe.string(object.createdAt)),
    });
  }

  fromEntityToObject(entity: UserEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      recoveryPhrase: entity.recoveryPhrase,
      createdAt: entity.createdAt.toISOString(),
    };
  }

  fromJson(json: string): UserEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }

  toJson(entity: UserEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
