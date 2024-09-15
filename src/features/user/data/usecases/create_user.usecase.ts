import { IEncryptAdapter } from '../../../../core/domain/adapters/encrypt.adapter';
import { ICreateUserDTO } from '../../domain/dtos/create_user_dto';
import { IUserRepository } from '../../domain/repositories/user.respository';
import { ICreateUserUsecase } from '../../domain/usecases/create_user.usecase';
import crypto from 'crypto';

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private repository: IUserRepository,
    private encryptAdapter: IEncryptAdapter,
  ) {}
  async exec(userData: ICreateUserDTO) {
    userData.password = await this.encryptAdapter.hash(userData.password);
    const createdUser = await this.repository.create({
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      recoveryPhrase: '',
      createdAt: new Date(),
    });
    return createdUser;
  }
}
