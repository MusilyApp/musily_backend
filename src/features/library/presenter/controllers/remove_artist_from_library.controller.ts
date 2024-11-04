import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { IRemoveArtistFromLibraryUsecase } from '../../domain/usecases/remove_artist_from_library.usecase';

export class RemoveArtistFromLibraryController extends AppController {
  constructor(
    private props: {
      removeArtistFromLibraryUsecase: IRemoveArtistFromLibraryUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const id = typeSafe.string(req.params.id);

    await this.props.removeArtistFromLibraryUsecase.exec(id);

    return res.send(200);
  }
}
