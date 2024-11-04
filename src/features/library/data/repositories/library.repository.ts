import { InternalServerError } from '../../../../core/data/errors/internal_server.error';
import { IAppModel } from '../../../../core/domain/adapters/app_model.adapter';
import { generateTrackHash } from '../../../../core/utils/genarate_tack_hash.util';
import { TrackEntity } from '../../../data_fetch/domain/entities/track.entity';
import { CreatePlaylistDTO } from '../../domain/dtos/create_playlist.dto';
import { UpdatePlaylistDTO } from '../../domain/dtos/update_playlist.dto';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { UserTrackEntity } from '../../domain/entities/user_track.entity';
import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { PlaylistNotFoundError } from '../errors/playlist_not_found';
import * as crypto from 'crypto';

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

  async getLibraryItem(
    id: string,
    userId: string,
  ): Promise<LibraryItemEntity | null> {
    const libraryItem = await this.props.libraryModel.findById(id);

    if (id === `favorites.${userId}`) {
      const favoritePlaylist = await this.props.libraryModel.findOne({
        id: {
          $includesString: 'favorites',
        },
        userId: userId,
      });
      if (!favoritePlaylist) {
        this.props.libraryModel.create({
          id: id,
          userId: userId,
          playlist: {
            id: id,
            title: 'favorites',
            trackCount: 0,
          },
          lastTimePlayed: new Date(),
          createdAt: new Date(),
        });
      }
    }
    if (libraryItem?.playlist) {
      const trackCount = await this.props.userTrackModel.countDocuments({
        libraryItem: id,
      });
      const tracks = await this.props.userTrackModel.find({ libraryItem: id });
      libraryItem.playlist.trackCount = trackCount;
      libraryItem.playlist.tracks = tracks;
    }
    return libraryItem;
  }

  async addTracksToPlaylist(
    tracks: TrackEntity[],
    libraryItemId: string,
    userId: string,
  ): Promise<void> {
    const libraryItem = await this.props.libraryModel.findOne({
      userId,
      id: libraryItemId,
    });

    if (!libraryItem) {
      throw new PlaylistNotFoundError();
    }

    const playlistTracks = await this.props.userTrackModel.find({
      libraryItem: libraryItemId,
    });

    const tracksFiltered = tracks.filter((e) => {
      const trackHash = generateTrackHash({
        albumTitle: e.album.title,
        artistName: e.artist.name,
        trackTitle: e.title,
      });
      if (playlistTracks.find((track) => track.hash === trackHash)) {
        return false;
      }
      return true;
    });

    if (libraryItem?.playlist) {
      const trackCount = await this.props.userTrackModel.countDocuments({
        libraryItem: libraryItemId,
      });
      await this.props.libraryModel.findOneAndUpdate(
        { id: libraryItemId },
        {
          ...libraryItem,
          playlist: {
            ...libraryItem.playlist,
            trackCount: trackCount + tracks.length,
          },
        },
      );
    }

    await this.props.userTrackModel.insertMany(
      tracksFiltered.map((e) => ({
        id: crypto.randomUUID(),
        trackId: e.trackId,
        highResImg: e.highResImg,
        lowResImg: e.lowResImg,
        hash: generateTrackHash({
          albumTitle: e.album.title,
          artistName: e.artist.name,
          trackTitle: e.title,
        }),
        title: e.title,
        album: e.album,
        artist: e.artist,
        libraryItem: libraryItemId,
        createdAt: new Date(),
      })),
    );
  }

  async removeTracksFromPlaylist(props: {
    itemIds: string[];
    userId: string;
    playlistId: string;
  }): Promise<void> {
    const libraryItem = await this.props.libraryModel.findOne({
      userId: props.userId,
      id: props.playlistId,
    });
    if (!libraryItem?.playlist) {
      throw new PlaylistNotFoundError();
    }
    await this.props.userTrackModel.deleteMany({
      $or: [
        {
          id: {
            $includesInArray: props.itemIds,
          },
        },
        {
          trackId: {
            $includesInArray: props.itemIds,
          },
        },
      ],
    });
    const trackCount = await this.props.userTrackModel.countDocuments({
      libraryItem: props.playlistId,
    });
    await this.props.libraryModel.findOneAndUpdate(
      { id: props.playlistId },
      {
        ...libraryItem,
        playlist: {
          ...libraryItem.playlist,
          trackCount: trackCount,
        },
      },
    );
  }

  async createPlaylist(
    playlist: CreatePlaylistDTO,
    userId: string,
  ): Promise<PlaylistEntity> {
    const uid = crypto.randomUUID();
    const createdItem = await this.props.libraryModel.create({
      id: uid,
      lastTimePlayed: new Date(),
      userId: userId,
      playlist: {
        id: uid,
        title: playlist.title.trim(),
        artist: playlist.artist,
        trackCount: 0,
      },
      createdAt: new Date(),
    });
    if (createdItem.playlist != null) {
      return createdItem.playlist;
    }
    throw new InternalServerError();
  }

  async updatePlaylist(
    playlist: UpdatePlaylistDTO,
  ): Promise<PlaylistEntity | undefined> {
    if (playlist.id.startsWith('favorites')) {
      return;
    }
    const currentItem = await this.props.libraryModel.findById(playlist.id);
    if (!currentItem?.playlist) {
      throw new PlaylistNotFoundError();
    }
    const currentPlaylist = currentItem.playlist;
    const updatedPlaylist = await this.props.libraryModel.findByIdAndUpdate(
      playlist.id,
      {
        playlist: {
          id: currentPlaylist.id,
          title: playlist.title.trim(),
          trackCount: 0,
          artist: currentPlaylist.artist,
        },
      },
    );
    return updatedPlaylist?.playlist;
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    await this.props.libraryModel.findByIdAndDelete(playlistId);
    await this.props.userTrackModel.deleteMany({ libraryItem: playlistId });
  }

  async addToLibrary(
    libraryItem: LibraryItemEntity,
  ): Promise<LibraryItemEntity> {
    const currentItem = await this.props.libraryModel.findById(libraryItem.id);
    if (currentItem) {
      return currentItem;
    }
    const item = await this.props.libraryModel.create(libraryItem);
    if (item.album) {
      item.album.tracks = item.album.tracks.map((e) => ({
        ...e,
        hash: generateTrackHash({
          albumTitle: e.album.title,
          artistName: e.artist.name,
          trackTitle: e.title,
        }),
      }));
    }
    return item;
  }

  async removeFromLibrary(libraryItemId: string): Promise<void> {
    await this.props.libraryModel.findByIdAndDelete(libraryItemId);
  }
}
