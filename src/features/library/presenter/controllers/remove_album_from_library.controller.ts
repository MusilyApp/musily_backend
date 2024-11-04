import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { LoginRequiredError } from '../../../auth/data/errors/login_required.error';
import { LibraryItemNotFoundError } from '../../data/errors/library_item_not_found.error';
import { IGetLibraryItemUsecase } from '../../domain/usecases/get_library_item.usecase';
import { IRemoveAlbumFromLibraryUsecase } from '../../domain/usecases/remove_album_from_library.usecase';

export class RemoveAlbumFromLibraryController extends AppController {
  constructor(
    private props: {
      removeAlbumFromLibraryUsecase: IRemoveAlbumFromLibraryUsecase;
      getLibraryItemUsecase: IGetLibraryItemUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const id = typeSafe.string(req.params.id);

    if (!req.user) {
      throw new LoginRequiredError();
    }

    const libraryItem = await this.props.getLibraryItemUsecase.exec(
      id,
      req.user.id,
    );

    if (!libraryItem) {
      throw new LibraryItemNotFoundError();
    }

    if (libraryItem.userId != req.user?.id) {
      throw new LibraryItemNotFoundError();
    }

    await this.props.removeAlbumFromLibraryUsecase.exec(id);

    return res.send(200);
  }
}
