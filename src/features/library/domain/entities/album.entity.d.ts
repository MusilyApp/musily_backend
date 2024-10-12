import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { SimplifiedArtistEntity } from './simplified_artist.entity';

export interface AlbumEntity {
  id: string;
  title: string;
  releaseDate: Date;
  artist: SimplifiedArtistEntity;
  tracks: TrackEntity[];
}
