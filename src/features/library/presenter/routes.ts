import { RouterAdapter } from '../../../core/adapters/router.adapter';
import { authMiddleware } from '../../auth/presenter/middlewares/auth.middleware';
import { TrackMapper } from '../../data_fetch/data/mappers/track.mapper';
import { ArtistMapper } from '../data/mappers/artist.mapper';
import { PlaylistMapper } from '../data/mappers/playlist.mapper';
import { LibraryRepository } from '../data/repositories/library.repository';
import { AddAlbumToLibaryUsecase } from '../data/usecases/add_album_to_library.usecase';
import { AddArtistToLibraryUsecase } from '../data/usecases/add_artist_to_library.usecase';
import { AddTracksToPlaylistUsecase } from '../data/usecases/add_tracks_to_playlist.usecase';
import { CreatePlaylistUsecase } from '../data/usecases/create_playlist.usecase';
import { DeletePlaylistUsecase } from '../data/usecases/delete_playlist.usecase';
import { GetLibraryUsecase } from '../data/usecases/get_library.usecase';
import { GetLibraryItemUsecase } from '../data/usecases/get_library_item.usecase';
import { RemoveAlbumFromLibraryUsecase } from '../data/usecases/remove_album_from_library.usecase';
import { RemoveArtistFromLibraryUsecase } from '../data/usecases/remove_artist_from_library.usecase';
import { RemoveTracksFromPlaylistUsecase } from '../data/usecases/remove_tracks_from_playlist.usecase';
import { UpdatePlaylistUsecase } from '../data/usecases/update_playlist.usecase';
import { AddAlbumToLibraryController } from './controllers/add_album_to_library.controller';
import { AddArtistToLibraryController } from './controllers/add_artist_to_library.controller';
import { AddTracksToPlaylistController } from './controllers/add_tracks_to_playlist.controller';
import { CreatePlaylistController } from './controllers/create_playlist.controller';
import { DeletePlaylistController } from './controllers/delete_playlist.controller';
import { GetLibraryController } from './controllers/get_library.controller';
import { GetLibraryItemController } from './controllers/get_library_item.controller';
import { RemoveAlbumFromLibraryController } from './controllers/remove_album_from_library.controller';
import { RemoveArtistFromLibraryController } from './controllers/remove_artist_from_library.controller';
import { RemoveTracksFromPlaylistController } from './controllers/remove_tracks_from_playlist.controller';
import { UpdatePlaylistController } from './controllers/update_playlist.controller';
import { LibraryItemModel } from './models/library_item.model';
import { UserTracksModel } from './models/user_tracks.model';

const libraryRoutes = new RouterAdapter();

const libraryModel = LibraryItemModel;
const userTrackModel = UserTracksModel;

const artistMapper = new ArtistMapper();
const playlistMapper = new PlaylistMapper();
const trackMapper = new TrackMapper();

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

libraryRoutes.post('/add_artist_to_library', authMiddleware(), (req, res) => {
  const addArtistToLibraryUsecase = new AddArtistToLibraryUsecase({
    libraryRepository,
  });
  const addArtistToLibraryController = new AddArtistToLibraryController({
    addArtistToLibraryUsecase,
    artistMapper,
  });
  return addArtistToLibraryController.handleRequest(req, res);
});

libraryRoutes.delete(
  '/remove_artist_from_library/:id',
  authMiddleware(),
  (req, res) => {
    const removeArtistFromLibraryUsecase = new RemoveArtistFromLibraryUsecase({
      libraryRepository,
    });
    const removeArtistFromLibraryController =
      new RemoveArtistFromLibraryController({
        removeArtistFromLibraryUsecase,
      });
    return removeArtistFromLibraryController.handleRequest(req, res);
  },
);

libraryRoutes.post('/create_playlist', authMiddleware(), (req, res) => {
  const createPlaylistUsecase = new CreatePlaylistUsecase({
    libraryRepository,
  });
  const createPlaylistController = new CreatePlaylistController({
    createPlaylistUsecase,
    playlistMapper,
  });
  return createPlaylistController.handleRequest(req, res);
});

libraryRoutes.post('/add_tracks_to_playlist', authMiddleware(), (req, res) => {
  const addTracksToPlaylistUsecase = new AddTracksToPlaylistUsecase({
    libraryRepository,
  });
  const addTracksToPlaylistController = new AddTracksToPlaylistController({
    addTracksToPlaylistUsecase,
    trackMapper,
  });
  return addTracksToPlaylistController.handleRequest(req, res);
});

libraryRoutes.delete(
  '/remove_tracks_from_playlist/:id',
  authMiddleware(),
  (req, res) => {
    const removeTracksFromPlaylistUsecase = new RemoveTracksFromPlaylistUsecase(
      {
        libraryRepository,
      },
    );
    const removeTracksFromPlaylistController =
      new RemoveTracksFromPlaylistController({
        removeTracksFromPlaylistUsecase,
      });
    return removeTracksFromPlaylistController.handleRequest(req, res);
  },
);

libraryRoutes.patch('/update_playlist', authMiddleware(), (req, res) => {
  const updatePlaylistUsecase = new UpdatePlaylistUsecase({
    libraryRepository,
  });
  const updatePlaylistController = new UpdatePlaylistController({
    playlistMapper,
    updatePlaylistUsecase,
  });
  return updatePlaylistController.handleRequest(req, res);
});

libraryRoutes.delete('/delete_playlist/:id', authMiddleware(), (req, res) => {
  const deletePlaylistUsecase = new DeletePlaylistUsecase({
    libraryRepository,
  });
  const deletePlaylistController = new DeletePlaylistController({
    deletePlaylistUsecase,
  });
  return deletePlaylistController.handleRequest(req, res);
});

export default libraryRoutes;
