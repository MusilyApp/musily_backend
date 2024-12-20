import { IAppModel } from '../../../../core/domain/adapters/app_model.adapter';
import { ITokenGenerator } from '../../../../core/domain/adapters/token_generator.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { IUserEntity } from '../../../user/domain/entities/user.entity';
import { LoginRequiredError } from '../../data/errors/login_required.error';
import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';

export class AuthController extends AppController {
  constructor(
    private tokenGenerator: ITokenGenerator<{ id: string }>,
    private userModel: IAppModel<IUserEntity>,
  ) {
    super();
  }
  async controllerBusiness(
    req: Request,
    res: Response,
    next: () => void,
  ): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string') {
      throw new LoginRequiredError();
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new LoginRequiredError();
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      throw new LoginRequiredError();
    }
    const tokenData = await this.tokenGenerator.verify(
      token,
      'b68cec109e1b620ba32a1bb7f21d48e490c253ad',
    );
    const user = await this.userModel.findById(tokenData.id);
    if (user) {
      req.defineUser(user);
      return next();
    }
    throw new LoginRequiredError();
  }
}
