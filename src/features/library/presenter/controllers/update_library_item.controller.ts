import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { IUpdateLibraryItemUsecase } from '../../domain/usecases/update_library_item.usecase';

export class UpdateLibraryItemController extends AppController {
  constructor(
    private props: {
      updateLibraryItemUsecase: IUpdateLibraryItemUsecase;
      libraryItemMapper: IModelMapper<LibraryItemEntity>;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const libraryItem = this.props.libraryItemMapper.fromObjectToEntity({
      userId: req.user?.id,
      ...req.body,
    });
    libraryItem.lastTimePlayed = new Date();
    const updatedLibraryItem = await this.props.updateLibraryItemUsecase.exec(
      libraryItem,
      req.user?.id ?? '',
    );
    return res.send(200, updatedLibraryItem);
  }
}
