import { ILibraryRepository } from '../../domain/repositories/library.repository';
import { IRemoveTrackFromPlaylistUsecase } from '../../domain/usecases/remove_track_from_playlist.usecase';

export class RemoveTrackFromPlaylistUsecase
  implements IRemoveTrackFromPlaylistUsecase
{
  constructor(
    private props: {
      libraryRepository: ILibraryRepository;
    },
  ) {}
  async exec(docummentId: string): Promise<void> {
    await this.props.libraryRepository.removeTrackFromPlaylist(docummentId);
  }
}
