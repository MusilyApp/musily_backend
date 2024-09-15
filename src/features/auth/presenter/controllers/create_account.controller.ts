import { InvalidRequestError } from '../../../../core/data/errors/invalid_request.error';
import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { ICreateAccountUsecase } from '../../domain/usecases/create_accout.usecase';

export class CreateAccountController extends AppController {
  constructor(private createAccountUsecase: ICreateAccountUsecase) {
    super();
  }
  async controllerBusiness(
    req: Request,
    res: Response,
    next?: () => void,
  ): Promise<void> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new InvalidRequestError();
    }

    if (![name, email, password].every((e) => typeof e === 'string')) {
      throw new InvalidRequestError();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new InvalidRequestError();
    }

    if (password.length < 8) {
      throw new InvalidRequestError();
    }

    const result = await this.createAccountUsecase.exec({
      id: '',
      name: name as string,
      email: email as string,
      password: password as string,
      recoveryPhrase: '',
      createdAt: new Date(),
    });

    res.send(201, result);
  }
}
