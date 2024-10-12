import { IModelMapper } from '../../../../core/domain/mappers/model_mapper';
import { typeSafe } from '../../../../core/utils/type_safe.util';
import { AlbumEntity } from '../../domain/entities/album.entity';
import { ArtistEntity } from '../../domain/entities/artist.entity';
import { LibraryItemEntity } from '../../domain/entities/library_item.entity';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { AlbumMapper } from './album.mapper';
import { ArtistMapper } from './artist.mapper';
import { PlaylistMapper } from './playlist.mapper';

export class LibraryItemMapper implements IModelMapper<LibraryItemEntity> {
  private artistMapper = new ArtistMapper();
  private albumMapper = new AlbumMapper();
  private playlistMapper = new PlaylistMapper();

  fromObjectToEntity(object: Record<string, unknown>): LibraryItemEntity {
    return {
      id: typeSafe.string(object.id),
      lastTimePlayed: new Date(typeSafe.string(object.lastTimePlayed)),
      userId: typeSafe.string(object.userId),
      artist: !object.artist
        ? undefined
        : this.artistMapper.fromObjectToEntity(
            object.artist as Record<string, unknown>,
          ),
      album: !object.album
        ? undefined
        : this.albumMapper.fromObjectToEntity(
            object.album as Record<string, unknown>,
          ),
      playlist: !object.playlist
        ? undefined
        : this.playlistMapper.fromObjectToEntity(
            object.playlist as Record<string, unknown>,
          ),
      createdAt: new Date(typeSafe.string(object.createdAt)),
    };
  }
  fromEntityToObject(entity: LibraryItemEntity): Record<string, unknown> {
    return {
      id: entity.id,
      lastTimePlayed: entity.lastTimePlayed?.toISOString(),
      userId: entity.userId,
      artist: entity.artist
        ? this.artistMapper.fromEntityToObject(entity.artist)
        : undefined,
      album: entity.album
        ? this.albumMapper.fromEntityToObject(entity.album)
        : undefined,
      playlist: entity.playlist
        ? this.playlistMapper.fromEntityToObject(entity.playlist)
        : undefined,
      createdAt: entity.createdAt.toISOString(),
    };
  }
  fromJson(json: string): LibraryItemEntity {
    const object = JSON.parse(json);
    return this.fromObjectToEntity(object);
  }
  toJson(entity: LibraryItemEntity): string {
    return JSON.stringify(this.fromEntityToObject(entity));
  }
}
