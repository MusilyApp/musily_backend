import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { LoginRequiredError } from '../../../auth/data/errors/login_required.error';
import { IAddAlbumToLibraryUsecase } from '../../domain/usecases/add_album_to_library.usecase';

export class AddAlbumToLibraryController extends AppController {
  constructor(
    private props: {
      addAlbumToLibraryUsecase: IAddAlbumToLibraryUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const album = req.body;

    if (!req.user?.id) {
      throw new LoginRequiredError();
    }

    const item = await this.props.addAlbumToLibraryUsecase.exec(
      album,
      req.user!.id,
    );

    return res.send(200, item);
  }
}
