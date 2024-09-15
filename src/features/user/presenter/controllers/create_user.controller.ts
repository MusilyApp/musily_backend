import { InvalidRequestError } from '../../../../core/data/errors/invalid_request.error';
import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { ICreateUserDTO } from '../../domain/dtos/create_user_dto';
import { ICreateUserUseCase } from '../../domain/usecases/create_user.usecase';

export class CreateUserController extends AppController {
  constructor(private createUserUseCase: ICreateUserUseCase) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const {
      admin,
      birthday,
      cpf,
      email,
      name,
      password,
      surname,
      verifiedEmail,
    } = req.body;
    if (!birthday || !cpf || !email || !name || !surname || !password) {
      throw new InvalidRequestError();
    }
    const createUserDTO: ICreateUserDTO = {
      admin: admin ?? false,
      birthday: birthday,
      cpf: cpf,
      email: email,
      name: name,
      password: password,
      surname: surname,
      verifiedEmail: verifiedEmail ?? false,
    };
    const createdUser = await this.createUserUseCase.exec(createUserDTO);
    return res.send(201, createdUser);
  }
}
