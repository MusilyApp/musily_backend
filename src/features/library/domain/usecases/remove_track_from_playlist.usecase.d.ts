export interface IRemoveTrackFromPlaylistUsecase {
  exec(trackId: string, playlistId: string): Promise<void>;
}
