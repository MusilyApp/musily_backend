import { IUserEntity } from '../../../user/domain/entities/user.entity';

export type LoginOutput = {
  token: string;
  user: IUserEntity;
};

export interface ILoginUseCase {
  exec(email: string, password: string): Promise<Partial<LoginOutput>>;
}
