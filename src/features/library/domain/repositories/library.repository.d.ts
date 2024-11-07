import { LibraryItemEntity } from '../entities/library_item.entity';
import { PlaylistEntity } from '../entities/playlist.entity';
import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { CreatePlaylistDTO } from '../dtos/create_playlist.dto';
import { UpdatePlaylistDTO } from '../dtos/update_playlist.dto';

export interface ILibraryRepository {
  getLibrary(userId: string): Promise<LibraryItemEntity[]>;
  getLibraryItem(id: string, userId: string): Promise<LibraryItemEntity | null>;
  addTracksToPlaylist(
    tracks: TrackEntity[],
    libraryItemId: string,
    userId: string,
  ): Promise<void>;
  removeTracksFromPlaylist(props: {
    itemIds: string[];
    userId: string;
    playlistId: string;
  }): Promise<void>;
  createPlaylist(
    playlist: CreatePlaylistDTO,
    userId: string,
  ): Promise<PlaylistEntity>;
  updatePlaylist(
    playlist: UpdatePlaylistDTO,
  ): Promise<PlaylistEntity | undefined>;
  deletePlaylist(playlistId: string): Promise<void>;
  addToLibrary(libraryItem: LibraryItemEntity): Promise<LibraryItemEntity>;
  removeFromLibrary(libraryItemId: string): Promise<void>;
  updateLibraryItem(
    item: LibraryItemEntity,
    userId: string,
  ): Promise<LibraryItemEntity>;
}
