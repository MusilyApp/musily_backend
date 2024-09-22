import { AlbumEntity } from '../../../library/domain/entities/album.entity';
import { ArtistEntity } from '../../../library/domain/entities/artist.entity';

export interface TrackEntity {
  id: string;
  trackId: string;
  title: string;
  hash: string;
  artist: ArtistEntity;
  album: AlbumEntity;
}
