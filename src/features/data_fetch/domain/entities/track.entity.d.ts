import { SimplifiedAlbumEntity } from '../../../library/domain/entities/simplified_album.entity';
import { SimplifiedArtistEntity } from '../../../library/domain/entities/simplified_artist.entity';

export interface TrackEntity {
  id: string;
  trackId: string;
  title: string;
  hash: string;
  highResImg?: string;
  lowResImg?: string;
  artist: SimplifiedArtistEntity;
  album: SimplifiedAlbumEntity;
}
