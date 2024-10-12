import { AppModelAdapter } from '../../../../core/adapters/app_model.adapter';
import { LibraryItemMapper } from '../../data/mappers/library_item.mapper';

const libraryItemMapper = new LibraryItemMapper();

export const LibraryItemModel = new AppModelAdapter(
  'library_items',
  libraryItemMapper,
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    lastTimePlayed: {
      type: Date,
      default: Date.now(),
    },
    album: {
      type: Object,
    },
    artist: {
      type: Object,
    },
    playlist: {
      type: Object,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
);
