import { IUserEntity } from '../../../user/domain/entities/user.entity';

export interface ICreateAccountUsecase {
  exec(user: IUserEntity): Promise<{
    user: IUserEntity;
    token: string;
  }>;
}
