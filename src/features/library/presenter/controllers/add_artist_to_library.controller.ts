import {
  Request,
  Response,
} from '../../../../core/domain/adapters/router.adapter';
import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { AppController } from '../../../../core/presenter/controllers/app_controller';
import { LoginRequiredError } from '../../../auth/data/errors/login_required.error';
import { ArtistEntity } from '../../domain/entities/artist.entity';
import { IAddArtistToLibraryUsecase } from '../../domain/usecases/add_artist_to_library.usecase';

export class AddArtistToLibraryController extends AppController {
  constructor(
    private props: {
      addArtistToLibraryUsecase: IAddArtistToLibraryUsecase;
      artistMapper: IModelMapper<ArtistEntity>;
    },
  ) {
    super();
  }
  async controllerBusiness(req: Request, res: Response): Promise<void> {
    const user = req.user;
    if (!user) {
      throw new LoginRequiredError();
    }
    const artist = this.props.artistMapper.fromObjectToEntity(req.body);

    const item = await this.props.addArtistToLibraryUsecase.exec(
      artist,
      user.id,
    );

    return res.send(200, item);
  }
}
