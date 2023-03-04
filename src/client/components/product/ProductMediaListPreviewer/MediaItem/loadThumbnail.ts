export const loadThumbnail = async (url: string) => {
  const video = document.createElement('video');

  await new Promise((resolve) => {
    video.src = url;
    video.addEventListener('canplaythrough', resolve, { once: true });
  });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  if (context === null) {
    return;
  }

  video.currentTime = 0;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const thumbnailData = canvas.toDataURL('image/png');
  return thumbnailData;
};
