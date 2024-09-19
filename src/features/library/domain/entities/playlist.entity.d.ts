import { ArtistEntity } from './artist.entity';

export interface PlaylistEntity {
  id: string;
  title: string;
  track_count: string;
  artist: ArtistEntity;
}
