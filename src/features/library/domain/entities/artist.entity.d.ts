import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { AlbumEntity } from './album.entity';

export interface ArtistEntity {
  id: string;
  name: string;
  highResImg?: string;
  lowResImg?: string;
  topTracks: TrackEntity[];
  topAlbums: AlbumEntity[];
  topSingles: AlbumEntity[];
}
