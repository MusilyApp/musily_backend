export interface IRemoveAlbumFromLibraryUsecase {
  exec(libraryItemId: string): Promise<void>;
}
