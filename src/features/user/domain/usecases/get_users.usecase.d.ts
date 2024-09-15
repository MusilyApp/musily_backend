import { DataRequestArgs } from '../../../../core/domain/types/data_request.types';
import { PaginatedResultOutput } from '../../../../core/domain/types/pagination.types';
import { IUserEntity } from '../entities/user.entity';

export interface IGetUsersUseCase {
  exec(
    dataRequest: DataRequestArgs,
  ): Promise<PaginatedResultOutput<IUserEntity>>;
}
