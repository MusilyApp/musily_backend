import { IUserEntity } from '../entities/user.entity';

export interface IGetUserUseCase {
  exec(id: string): Promise<IUserEntity>;
}
