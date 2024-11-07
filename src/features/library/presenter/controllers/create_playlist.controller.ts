import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { LoginRequiredError } from '../../../auth/data/errors/login_required.error';
import { CreatePlaylistDTO } from '../../domain/dtos/create_playlist.dto';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { ICreatePlaylistUsecase } from '../../domain/usecases/create_playlist.usecase';

export class CreatePlaylistController extends AppController {
  constructor(
    private props: {
      createPlaylistUsecase: ICreatePlaylistUsecase;
      playlistMapper: IModelMapper<PlaylistEntity>;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    if (!req.user?.id) {
      throw new LoginRequiredError();
    }

    const userId = typeSafe.string(req.user.id);
    const playlist: CreatePlaylistDTO = {
      title: typeSafe.string(req.body.title),
      artist: req.body.artist
        ? {
            id: typeSafe.string(req.body.artist.name),
            name: typeSafe.string(req.body.artist.name),
          }
        : undefined,
    };

    const createdPlaylist = await this.props.createPlaylistUsecase.exec(
      playlist,
      userId,
    );

    return res.send(201, createdPlaylist);
  }
}
