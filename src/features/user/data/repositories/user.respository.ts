import { IUserRepository } from '../../domain/repositories/user.respository';
import { IAppModel } from '../../../../core/domain/adapters/app_model.adapter';
import { UserNotFoundError } from '../errors/user_not_found.error';
import { UserEntity } from '../entities/user.entity';
import { IUserEntity } from '../../domain/entities/user.entity';
import { IUpdateUserDTO } from '../../domain/dtos/update_user_dto';
import { DataRequestArgs } from '../../../../core/domain/types/data_request.types';
import { PaginatedResultOutput } from '../../../../core/domain/types/pagination.types';

export class UserRepository implements IUserRepository {
  constructor(private model: IAppModel<IUserEntity>) {}
  async create(item: IUserEntity) {
    const user = await this.model.create(item);
    return user;
  }
  async getAllUsers(
    dataRequest: DataRequestArgs,
  ): Promise<PaginatedResultOutput<IUserEntity>> {
    const paginatedUsers = await this.model.findPaginated({
      limit: dataRequest.pagination.limit,
      page: dataRequest.pagination.page,
    });
    return {
      total: paginatedUsers.total,
      items: paginatedUsers.items.map((item) => UserEntity.fromJson(item)),
    };
  }
  async findUserById(id: string): Promise<IUserEntity | null> {
    const user = await this.model.findById(id);
    if (user) {
      return UserEntity.fromJson(user);
    }
    return null;
  }
  async updateUser(id: string, userUpdated: IUpdateUserDTO) {
    const user = await this.model.findByIdAndUpdate(id, userUpdated);
    if (user) {
      return UserEntity.fromJson(user);
    }
    throw new UserNotFoundError();
  }
}
