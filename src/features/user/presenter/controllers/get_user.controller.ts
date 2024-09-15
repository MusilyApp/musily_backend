import { InvalidRequestError } from '../../../../core/data/errors/invalid_request.error';
import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { IGetUserUseCase } from '../../domain/usecases/get_user.usecase';

export class GetUserController extends AppController {
  constructor(private getUserUseCase: IGetUserUseCase) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    if (!id) {
      throw new InvalidRequestError();
    }
    const user = await this.getUserUseCase.exec(id);
    return res.send(200, user);
  }
}
