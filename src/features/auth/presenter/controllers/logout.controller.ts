import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';

export class LogoutController extends AppController {
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    return res.send(200);
  }
}
