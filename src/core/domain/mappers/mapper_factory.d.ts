import { TrackEntity } from '../../../features/data_fetch/domain/entities/track.entity';
import { AlbumEntity } from '../../../features/library/domain/entities/album.entity';
import { ArtistEntity } from '../../../features/library/domain/entities/artist.entity';
import { LibraryItemEntity } from '../../../features/library/domain/entities/library_item.entity';
import { PlaylistEntity } from '../../../features/library/domain/entities/playlist.entity';
import { SimplifiedAlbumEntity } from '../../../features/library/domain/entities/simplified_album.entity';
import { SimplifiedArtistEntity } from '../../../features/library/domain/entities/simplified_artist.entity';
import { UserEntity } from '../../../features/user/data/entities/user.entity';
import { IModelMapper } from './model_mapper';

interface IMapperFactory {
  getAlbumMapper(): IModelMapper<AlbumEntity>;
  getLibraryItemMapper(): IModelMapper<LibraryItemEntity>;
  getTrackMapper(): IModelMapper<TrackEntity>;
  getSimplifiedArtistMapper(): IModelMapper<SimplifiedArtistEntity>;
  getSimplifiedAlbumMapper(): IModelMapper<SimplifiedAlbumEntity>;
  getArtistMapper(): IModelMapper<ArtistEntity>;
  getPlaylistMapper(): IModelMapper<PlaylistEntity>;
  getUserMapper(): IModelMapper<UserEntity>;
}
