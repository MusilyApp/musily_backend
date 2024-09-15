import { InvalidRequestError } from '../../../../core/data/errors/invalid_request.error';
import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { IGetUserUsecase } from '../../domain/usecases/get_user.usecase';

export class GetUserController extends AppController {
  constructor(private getUserUsecase: IGetUserUsecase) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    if (!id) {
      throw new InvalidRequestError();
    }
    const user = await this.getUserUsecase.exec(id);
    return res.send(200, user);
  }
}
