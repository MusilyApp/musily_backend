import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { UserEntity } from '../entities/user.entity';

export class UserMapper implements IModelMapper<UserEntity> {
  fromJsonDataToEntity(jsonData: Record<string, any>): UserEntity {
    return new UserEntity({
      id: jsonData.id,
      name: jsonData.name,
      email: jsonData.email,
      recoveryPhrase: jsonData.recoveryPhrase,
      createdAt: jsonData.createdAt,
    });
  }
}
