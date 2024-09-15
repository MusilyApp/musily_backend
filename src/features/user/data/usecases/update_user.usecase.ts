import { IEncryptAdapter } from '../../../../core/domain/adapters/encrypt.adapter';
import { IUpdateUserDTO } from '../../domain/dtos/update_user_dto';
import { IUserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.respository';
import { IUpdateUserUseCase } from '../../domain/usecases/update_user.usecase';
import { UserNotFoundError } from '../errors/user_not_found.error';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptAdapter: IEncryptAdapter,
  ) {}
  async exec(id: string, userData: IUpdateUserDTO): Promise<IUserEntity> {
    if (userData.password) {
      userData.password = await this.encryptAdapter.hash(userData.password);
    } else {
      userData.password = undefined;
    }
    const updatedUser = await this.userRepository.updateUser(id, userData);
    if (!updatedUser) {
      throw new UserNotFoundError();
    }
    return updatedUser;
  }
}
