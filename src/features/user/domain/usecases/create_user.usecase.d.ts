import { ICreateUserDTO } from '../dtos/create_user_dto';
import { IUserEntity } from '../entities/user.entity';

export interface ICreateUserUsecase {
  exec(userData: ICreateUserDTO): Promise<IUserEntity>;
}
