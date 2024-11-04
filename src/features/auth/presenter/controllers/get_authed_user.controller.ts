import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { LoginRequiredError } from '../../data/errors/login_required.error';

export class GetAuthedUserController extends AppController {
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const user = req.user;

    if (!user) {
      throw new LoginRequiredError();
    }
    return res.send(200, { user });
  }
}
