import { IUpdateUserDTO } from '../dtos/update_user_dto';
import { IUserEntity } from '../entities/user.entity';

export interface IUpdateUserUseCase {
  exec(id: string, userData: IUpdateUserDTO): Promise<IUserEntity>;
}
