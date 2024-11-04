import { SimplifiedArtistEntity } from '../entities/simplified_artist.entity';

export interface CreatePlaylistDTO {
  title: string;
  artist?: SimplifiedArtistEntity;
}
