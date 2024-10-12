import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { LoginRequiredError } from '../../../auth/data/errors/login_required.error';
import { IGetLibraryUsecase } from '../../domain/usecases/get_library.usecase';

export class GetLibraryController extends AppController {
  constructor(
    private props: {
      getLibraryUsecase: IGetLibraryUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new LoginRequiredError();
    }
    const libraryItems = await this.props.getLibraryUsecase.exec(req.user.id);
    return res.send(200, libraryItems);
  }
}
