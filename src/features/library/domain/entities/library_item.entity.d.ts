export interface LibraryItemEntity<T> {
  id: string;
  type: 'playlist' | 'album' | 'artist';
  lastTimePlayed: Date;
  value: T;
}
