import { ICreateUserDTO } from '../dtos/create_user_dto';
import { IUserEntity } from '../entities/user.entity';

export interface ICreateUserUseCase {
  exec(userData: ICreateUserDTO): Promise<IUserEntity>;
}
