export interface IRemoveTrackFromPlaylistUsecase {
  exec(docummentId: string): Promise<void>;
}
