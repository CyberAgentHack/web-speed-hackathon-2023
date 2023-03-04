type MediaType = 'image' | 'video';

export function getMediaType(filename: string): MediaType {
  if (filename.endsWith('.mp4')) {
    return 'video';
  }

  return 'image';
}
