// eslint-disable-next-line no-unused-vars
const store = (function() {
  const videos = [];
  const setVideos = function(videos) {
    this.videos = videos;
  };

  return {
    videos,
    setVideos
  };
}());