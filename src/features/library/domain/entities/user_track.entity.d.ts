import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';

export interface UserTrackEntity extends TrackEntity {
  libraryItem: string;
}
