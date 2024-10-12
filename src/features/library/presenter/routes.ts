import { RouterAdapter } from '../../../core/adapters/router.adapter';
import { authMiddleware } from '../../auth/presenter/middlewares/auth.middleware';
import { LibraryRepository } from '../data/repositories/library.repository';
import { AddAlbumToLibaryUsecase } from '../data/usecases/add_album_to_library.usecase';
import { GetLibraryUsecase } from '../data/usecases/get_library.usecase';
import { GetLibraryItemUsecase } from '../data/usecases/get_library_item.usecase';
import { RemoveAlbumFromLibraryUsecase } from '../data/usecases/remove_album_from_library.usecase';
import { AddAlbumToLibraryController } from './controllers/add_album_to_library.controller';
import { GetLibraryController } from './controllers/get_library.controller';
import { GetLibraryItemController } from './controllers/get_library_item.controller';
import { RemoveAlbumFromLibraryController } from './controllers/remove_album_from_library.controller';
import { LibraryItemModel } from './models/library_item.model';
import { UserTracksModel } from './models/user_tracks.model';

const libraryRoutes = new RouterAdapter();

const libraryModel = LibraryItemModel;
const userTrackModel = UserTracksModel;

const libraryRepository = new LibraryRepository({
  libraryModel,
  userTrackModel,
});

const getLibraryItemUsecase = new GetLibraryItemUsecase({
  libraryRepository,
});

libraryRoutes.get('/get_library_items', authMiddleware(), (req, res) => {
  const getLibraryUsecase = new GetLibraryUsecase({
    libraryRepository,
  });
  const getLibraryController = new GetLibraryController({
    getLibraryUsecase,
  });
  return getLibraryController.handleRequest(req, res);
});

libraryRoutes.get('/get_library_item/:id', authMiddleware(), (req, res) => {
  const getLibraryItemController = new GetLibraryItemController({
    getLibraryItemUsecase,
  });
  return getLibraryItemController.handleRequest(req, res);
});

libraryRoutes.post('/add_album_to_library', authMiddleware(), (req, res) => {
  const addAlbumToLibraryUsecase = new AddAlbumToLibaryUsecase({
    libraryRepository,
  });
  const addAlbumToLibraryController = new AddAlbumToLibraryController({
    addAlbumToLibraryUsecase,
  });
  return addAlbumToLibraryController.handleRequest(req, res);
});

libraryRoutes.delete(
  '/remove_album_from_library/:id',
  authMiddleware(),
  (req, res) => {
    const removeAlbumFromLibraryUsecase = new RemoveAlbumFromLibraryUsecase({
      libraryRepository,
    });
    const removeAlbumFromLibraryController =
      new RemoveAlbumFromLibraryController({
        getLibraryItemUsecase,
        removeAlbumFromLibraryUsecase,
      });
    return removeAlbumFromLibraryController.handleRequest(req, res);
  },
);

export default libraryRoutes;
