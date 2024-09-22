import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { PlaylistEntity } from './playlist.entity';

export interface LibraryItemEntity {
  id: string;
  lastTimePlayed: Date;
  userId: string;
  artist?: ArtistEntity;
  album?: AlbumEntity;
  playlist?: PlaylistEntity;
  createdAt: Date;
}
