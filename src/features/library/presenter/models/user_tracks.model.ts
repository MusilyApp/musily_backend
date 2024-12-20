import { AppModelAdapter } from '../../../../core/adapters/app_model.adapter';
import { UserTracksMapper } from '../../data/mappers/user_tracks.mapper';

const userTracksMapper = new UserTracksMapper();

export const UserTracksModel = new AppModelAdapter(
  'user_tracks',
  userTracksMapper,
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    hash: {
      type: String,
    },
    highResImg: {
      type: String,
    },
    lowResImg: {
      type: String,
    },
    libraryItem: {
      type: String,
    },
    trackId: {
      type: String,
    },
    title: {
      type: String,
    },
    album: {
      type: Object,
    },
    artist: {
      type: Object,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
);
