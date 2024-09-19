export interface IDeletePlaylistUsecase {
  exec(playlistId: string): Promise<void>;
}
