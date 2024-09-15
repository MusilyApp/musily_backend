import { IUserEntity } from '../../../user/domain/entities/user.entity';

export interface IGetAuthedUserUseCase {
  exec(id: string): Promise<IUserEntity>;
}
