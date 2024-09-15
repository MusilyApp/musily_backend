import { IAppModel } from '../../../../core/domain/adapters/app_model.adapter';
import { UserEntity } from '../../../user/data/entities/user.entity';
import { IUserEntity } from '../../../user/domain/entities/user.entity';
import { IAuthRepository } from '../../domain/repositories/auth.repository';

export class AuthRepository implements IAuthRepository {
  constructor(private userModel: IAppModel<IUserEntity>) {}

  async createUser(user: IUserEntity): Promise<IUserEntity> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }
  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    const user = await this.userModel.findOne(
      { email },
      {
        select: ['password'],
      },
    );
    if (user) {
      return UserEntity.fromJson(user);
    }
    return null;
  }
  async findUser(id: string): Promise<IUserEntity | null> {
    const user = await this.userModel.findById(id);
    if (user) {
      return UserEntity.fromJson(user);
    }
    return null;
  }
}
