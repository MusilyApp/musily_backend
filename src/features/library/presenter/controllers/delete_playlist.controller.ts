import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { IDeletePlaylistUsecase } from '../../domain/usecases/delete_playlist.usecase';

export class DeletePlaylistController extends AppController {
  constructor(
    private props: {
      deletePlaylistUsecase: IDeletePlaylistUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const playlistId = typeSafe.string(req.params.id);

    await this.props.deletePlaylistUsecase.exec(playlistId, req.user?.id ?? '');

    return res.send(200);
  }
}
