import { LibraryItemEntity } from '../entities/library_item.entity';
import { PlaylistEntity } from '../entities/playlist.entity';
import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';

export interface ILibraryRepository {
  getLibrary(userId: string): Promise<LibraryItemEntity[]>;
  getLibraryItem(id: string): Promise<LibraryItemEntity | null>;
  addTrackToPlaylist(track: TrackEntity, playlistId: string): Promise<void>;
  removeTrackFromPlaylist(docummentId: string): Promise<void>;
  createPlaylist(playlist: PlaylistEntity): Promise<PlaylistEntity>;
  updatePlaylist(playlist: PlaylistEntity): Promise<PlaylistEntity>;
  deletePlaylist(playlistId: string): Promise<void>;
  addToLibrary(libraryItem: LibraryItemEntity): Promise<void>;
  removeFromLibrary(libraryItemId: string): Promise<void>;
}
