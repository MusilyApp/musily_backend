export interface IDeletePlaylistUsecase {
  exec(playlistId: string, userId: string): Promise<void>;
}
