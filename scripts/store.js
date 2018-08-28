// eslint-disable-next-line no-unused-vars
const store = (function() {
  const videos = [];
  let prevPageToken = '';
  let nextPageToken = '';

  const setVideos = function(videos) {
    this.videos = videos;
  };

  const setPageTokens = function(response) {
    this.prevPageToken = response.prevPageToken;
    this.nextPageToken = response.nextPageToken;
  }

  return {
    videos,
    setVideos,
    prevPageToken,
    nextPageToken,
    setPageTokens
  };
}());