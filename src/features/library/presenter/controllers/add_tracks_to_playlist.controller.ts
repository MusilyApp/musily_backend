import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { IAddTracksToPlaylistUsecase } from '../../domain/usecases/add_tracks_to_playlist.usecase';

export class AddTracksToPlaylistController extends AppController {
  constructor(
    private props: {
      addTracksToPlaylistUsecase: IAddTracksToPlaylistUsecase;
      trackMapper: IModelMapper<TrackEntity>;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const playlistId = typeSafe.string(req.body.playlistId);
    const items = typeSafe.array<Record<string, unknown>>(req.body.tracks);

    const tracks = items.map((e) =>
      this.props.trackMapper.fromObjectToEntity(e),
    );

    await this.props.addTracksToPlaylistUsecase.exec(
      tracks,
      playlistId,
      req.user!.id,
    );

    return res.send(200);
  }
}
