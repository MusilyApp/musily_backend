import { InvalidRequestError } from '../../../../core/data/errors/invalid_request.error';
import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { IUpdateUserUseCase } from '../../domain/usecases/update_user.usecase';

export class UpdateUserController extends AppController {
  constructor(private updateUserUseCase: IUpdateUserUseCase) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    if (!id) {
      throw new InvalidRequestError();
    }
    const updatedUser = await this.updateUserUseCase.exec(id, req.body);
    return res.send(200, updatedUser);
  }
}
