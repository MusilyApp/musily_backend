import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IRemoveTracksFromPlaylistUsecase } from '../../domain/usecases/remove_tracks_from_playlist.usecase';

export class RemoveTracksFromPlaylistUsecase
  implements IRemoveTracksFromPlaylistUsecase
{
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(props: {
    itemIds: string[];
    userId: string;
    playlistId: string;
  }): Promise<void> {
    await this.props.libraryRepository.removeTracksFromPlaylist(props);
  }
}
