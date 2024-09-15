import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { InvalidCredentialsError } from '../../data/errors/invalid_credentials.error';
import { ILoginUsecase } from '../../domain/usecases/login.usecase';

export class LoginController extends AppController {
  constructor(private loginUsecase: ILoginUsecase) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new InvalidCredentialsError();
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new InvalidCredentialsError();
    }
    const loginData = await this.loginUsecase.exec(email, password);
    return res.send(200, loginData);
  }
}
