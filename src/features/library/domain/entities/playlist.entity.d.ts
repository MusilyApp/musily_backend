import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { SimplifiedArtistEntity } from './simplified_artist.entity';

export interface PlaylistEntity {
  id: string;
  title: string;
  trackCount: number;
  tracks?: TrackEntity[];
  artist?: SimplifiedArtistEntity;
}
