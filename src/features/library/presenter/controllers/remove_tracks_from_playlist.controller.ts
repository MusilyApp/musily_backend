import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { LoginRequiredError } from '../../../auth/data/errors/login_required.error';
import { IRemoveTracksFromPlaylistUsecase } from '../../domain/usecases/remove_tracks_from_playlist.usecase';

export class RemoveTracksFromPlaylistController extends AppController {
  constructor(
    private props: {
      removeTracksFromPlaylistUsecase: IRemoveTracksFromPlaylistUsecase;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const itemIds = typeSafe
      .array(req.body.tracks)
      .map((e) => typeSafe.string(e));
    const playlistId = typeSafe.string(req.params.id);

    if (!req.user) {
      throw new LoginRequiredError();
    }

    await this.props.removeTracksFromPlaylistUsecase.exec({
      itemIds: itemIds,
      playlistId,
      userId: req.user.id,
    });

    return res.send(200);
  }
}
