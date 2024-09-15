import { DataRequestArgs } from '../../../../core/domain/types/data_request.types';
import { PaginatedResultOutput } from '../../../../core/domain/types/pagination.types';
import { IUpdateUserDTO } from '../dtos/update_user_dto';
import { IUserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: IUserEntity): Promise<IUserEntity>;
  findUserById(id: string): Promise<IUserEntity | null>;
  updateUser(
    id: string,
    userUpdated: IUpdateUserDTO,
  ): Promise<IUserEntity | null>;
  getAllUsers(
    dataRequest: DataRequestArgs,
  ): Promise<PaginatedResultOutput<IUserEntity>>;
}
