import * as crypto from 'crypto';

export const generateTrackHash = (props: {
  artistName: string;
  albumTitle: string;
  trackTitle: string;
}): string => {
  const hash = crypto.createHash('md5');
  hash.update(`${props.trackTitle}.${props.artistName}.${props.albumTitle}`);
  return hash.digest('hex');
};
