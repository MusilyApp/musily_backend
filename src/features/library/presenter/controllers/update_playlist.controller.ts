import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { UpdatePlaylistDTO } from '../../domain/dtos/update_playlist.dto';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { IUpdatePlaylistUsecase } from '../../domain/usecases/update_playlist.usecase';

export class UpdatePlaylistController extends AppController {
  constructor(
    private props: {
      updatePlaylistUsecase: IUpdatePlaylistUsecase;
      playlistMapper: IModelMapper<PlaylistEntity>;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const playlist: UpdatePlaylistDTO = {
      id: typeSafe.string(req.body.id),
      title: typeSafe.string(req.body.title),
    };

    const updatedPlaylist = await this.props.updatePlaylistUsecase.exec(
      playlist,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      req.user!.id,
    );

    return res.send(200, updatedPlaylist);
  }
}
