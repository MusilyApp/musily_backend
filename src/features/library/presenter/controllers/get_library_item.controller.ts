import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { LibraryItemNotFoundError } from '../../data/errors/library_item_not_found.error';
import { IGetLibraryItemUsecase } from '../../domain/usecases/get_library_item.usecase';

export class GetLibraryItemController extends AppController {
  constructor(
    private props: {
      getLibraryItemUsecase: IGetLibraryItemUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const id = typeSafe.string(req.params.id);

    const libraryItem = await this.props.getLibraryItemUsecase.exec(
      id,
      req.user?.id ?? '',
    );

    if (!libraryItem) {
      throw new LibraryItemNotFoundError();
    }

    return res.send(200, libraryItem);
  }
}
