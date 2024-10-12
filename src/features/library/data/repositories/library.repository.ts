import { IAppModel } from '../../../../core/domain/adapters/app_model.adapter';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { UserTrackEntity } from '../../domain/entities/user_track.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';
import crypto from 'crypto';

export class LibraryRepository implements ILibraryRepository {
  constructor(
    private props: {
      libraryModel: IAppModel<LibraryItemEntity>;
      userTrackModel: IAppModel<UserTrackEntity>;
    },
  ) {}

  async getLibrary(userId: string): Promise<LibraryItemEntity[]> {
    const library = await this.props.libraryModel.find({ userId });
    return library;
  }
  async getLibraryItem(id: string): Promise<LibraryItemEntity | null> {
    const libraryItem = await this.props.libraryModel.findById(id);
    return libraryItem;
  }
  async addTracksToPlaylist(tracks: UserTrackEntity[]): Promise<void> {
    await this.props.userTrackModel.insertMany(tracks);
  }
  async removeTrackFromPlaylist(docummentId: string): Promise<void> {
    await this.props.userTrackModel.findByIdAndDelete(docummentId);
  }
  async createPlaylist(
    playlist: PlaylistEntity,
    userId: string,
  ): Promise<PlaylistEntity> {
    const createdItem = await this.props.libraryModel.create({
      id: crypto.randomUUID(),
      lastTimePlayed: new Date(),
      userId: userId,
      playlist: {
        id: crypto.randomUUID(),
        title: playlist.title,
        artist: playlist.artist,
        track_count: 0,
      },
      createdAt: new Date(),
    });
    return createdItem.playlist!;
  }
  async updatePlaylist(playlist: PlaylistEntity): Promise<PlaylistEntity> {
    const currentItem = await this.props.libraryModel.findById(playlist.id);
    if (!currentItem) {
      throw new PlaylistNotFoundError();
    }
    const updatedPlaylist = await this.props.libraryModel.findByIdAndUpdate(
      playlist.id,
      {
        playlist,
      },
    );
    return updatedPlaylist?.playlist!;
  }
  async deletePlaylist(playlistId: string): Promise<void> {
    await this.props.libraryModel.findByIdAndDelete(playlistId);
    await this.props.userTrackModel.deleteMany({ id: playlistId });
  }
  async addToLibrary(
    libraryItem: LibraryItemEntity,
  ): Promise<LibraryItemEntity> {
    const item = await this.props.libraryModel.create(libraryItem);
    return item;
  }
  async removeFromLibrary(libraryItemId: string): Promise<void> {
    await this.props.libraryModel.findByIdAndDelete(libraryItemId);
  }
}
