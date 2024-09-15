import { IUserEntity } from '../entities/user.entity';

export interface IGetUserUsecase {
  exec(id: string): Promise<IUserEntity>;
}
