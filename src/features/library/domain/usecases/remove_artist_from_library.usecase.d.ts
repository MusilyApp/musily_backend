export class IRemoveArtistFromLibraryUsecase {
  exec(libraryItemId: string): Promise<void>;
}
