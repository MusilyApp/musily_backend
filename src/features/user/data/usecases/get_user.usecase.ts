import { IUserRepository } from '../../domain/repositories/user.respository';
import { IGetUserUsecase } from '../../domain/usecases/get_user.usecase';
import { UserEntity } from '../entities/user.entity';
import { UserNotFoundError } from '../errors/user_not_found.error';

export class GetUserUsecase implements IGetUserUsecase {
  constructor(private repository: IUserRepository) {}
  async exec(id: string): Promise<UserEntity> {
    const user = await this.repository.findUserById(id);
    if (user) {
      return UserEntity.fromJson(user);
    }
    throw new UserNotFoundError();
  }
}
