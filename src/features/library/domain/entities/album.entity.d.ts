import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { ArtistEntity } from './artist.entity';

export interface AlbumEntity {
  id: string;
  title: string;
  releaseDate: Date;
  artist: ArtistEntity;
  tracks: TrackEntity[];
}
