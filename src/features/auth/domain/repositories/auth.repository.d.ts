import { IUserEntity } from '../../../user/domain/entities/user.entity';

export interface IAuthRepository {
  findUser: (id: string) => Promise<IUserEntity | null>;
  createUser: (user: IUserEntity) => Promise<IUserEntity>;
  findUserByEmail: (email: string) => Promise<IUserEntity | null>;
}
