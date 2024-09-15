import { IUserRepository } from '../../domain/repositories/user.respository';
import { IGetUserUseCase } from '../../domain/usecases/get_user.usecase';
import { UserEntity } from '../entities/user.entity';
import { UserNotFoundError } from '../errors/user_not_found.error';

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private repository: IUserRepository) {}
  async exec(id: string): Promise<UserEntity> {
    const user = await this.repository.findUserById(id);
    if (user) {
      return UserEntity.fromJson(user);
    }
    throw new UserNotFoundError();
  }
}
