export interface IRemoveTracksFromPlaylistUsecase {
  exec(props: {
    itemIds: string[];
    userId: string;
    playlistId: string;
  }): Promise<void>;
}
