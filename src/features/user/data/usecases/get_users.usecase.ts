import { DataRequestArgs } from '../../../../core/domain/types/data_request.types';
import { PaginatedResultOutput } from '../../../../core/domain/types/pagination.types';
import { IUserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.respository';
import { IGetUsersUseCase } from '../../domain/usecases/get_users.usecase';

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}
  async exec(
    dataRequest: DataRequestArgs,
  ): Promise<PaginatedResultOutput<IUserEntity>> {
    const users = await this.userRepository.getAllUsers(dataRequest);
    return users;
  }
}
