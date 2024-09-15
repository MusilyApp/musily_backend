import { IEncryptAdapter } from '../../../../core/domain/adapters/encrypt.adapter';
import { ICreateUserDTO } from '../../domain/dtos/create_user_dto';
import { IUserRepository } from '../../domain/repositories/user.respository';
import { ICreateUserUseCase } from '../../domain/usecases/create_user.usecase';
import crypto from 'crypto';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private repository: IUserRepository,
    private encryptAdapter: IEncryptAdapter,
  ) {}
  async exec(userData: ICreateUserDTO) {
    userData.password = await this.encryptAdapter.hash(userData.password);
    const createdUser = await this.repository.create({
      id: crypto.randomUUID(),
      admin: userData.admin,
      name: userData.name,
      surname: userData.surname,
      birthday: {
        day: userData.birthday.day,
        month: userData.birthday.month,
        year: userData.birthday.year,
      },
      cpf: userData.cpf,
      email: userData.email,
      password: userData.password,
      verifiedEmail: userData.verifiedEmail,
      createdAt: new Date(),
    });
    return createdUser;
  }
}
