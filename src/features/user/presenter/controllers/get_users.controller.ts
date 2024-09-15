import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { IGetUsersUsecase } from '../../domain/usecases/get_users.usecase';

export class GetUsersController extends AppController {
  constructor(private getUsersUsecase: IGetUsersUsecase) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const { page, limit, searchQuery } = req.query;
    const users = await this.getUsersUsecase.exec({
      pagination: {
        limit: limit ?? 10,
        page: page ?? 1,
      },
      searchQuery: searchQuery ?? '',
    });
    return res.send(200, users);
  }
}
