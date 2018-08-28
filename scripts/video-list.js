/* globals store api */
// eslint-disable-next-line no-unused-vars
const videoList = (function() {
    
  const decorateResponse = function(response) {
    return response.items.map(video => {
      return {
        id: video.id.videoId,
        title:video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle
      };
    });
  };

  const generateVideoItemHtml = function(video) {
    return `
        <li class="video-result">
            <a href="https://www.youtube.com/watch?v=${video.id}" class="video-thumbnail" data-lity><img src=${video.thumbnail}></a>
            <div class="video-info">
              <h2 class="video-title">${video.title}</h2>
              <a href="https://www.youtube.com/channel/${video.channelId}" class="channel-link">${video.channelTitle}</a>
            </div>
        </li>`;
  };

  const render = function() {
    console.log('running render');
    let html = store.videos.map(video => generateVideoItemHtml(video)).join('');
    $('.results').html(html);
    console.log(store.videos);
  };

  const handleFormSubmit = function() {
    $('form').submit(function(event) {
      event.preventDefault();
      const field = $('#search-term');
      store.searchTerm = field.val();
      field.val('');
      
      api.fetchVideos(store.searchTerm, '', response => {
        let decoratedVideos = decorateResponse(response);
        store.setVideos(decoratedVideos);
        store.setPageTokens(response);
        render();
      });
    });
  };

  const handlePageControls = function() {
    $('.prev-button').click(function(event) {
      api.fetchVideos(store.searchTerm, store.prevPageToken, response => {
        let decoratedVideos = decorateResponse(response);
        store.setVideos(decoratedVideos);
        store.setPageTokens(response);
        render();
      });
    });
    
    $('.next-button').click(function(event) {
      api.fetchVideos(store.searchTerm, store.nextPageToken, response => {
        let decoratedVideos = decorateResponse(response);
        store.setVideos(decoratedVideos);
        store.setPageTokens(response);
        render();
      });
    });
  };

  const bindEventListeners = function() {
    handleFormSubmit();
    handlePageControls();
  };

  return {
    render,
    bindEventListeners
  };
}());