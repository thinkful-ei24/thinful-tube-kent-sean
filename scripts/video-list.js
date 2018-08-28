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
        <li>
            <a href="https://www.youtube.com/watch?v=${video.id}"><img src=${video.thumbnail}></a>
            <a href="#">${video.title}</a>
            <a href="https://www.youtube.com/channel/${video.channelId}">${video.channelTitle}</a>
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
      let searchTerm = field.val();
      field.val('');
      
      api.fetchVideos(searchTerm, decorateResponse);
      api.fetchVideos(searchTerm, response => {
        let decoratedVideos = decorateResponse(response);
        store.setVideos(decoratedVideos);
        render();
      });
    });
  };

  const bindEventListeners = function() {
    handleFormSubmit();
  };

  return {
    render,
    bindEventListeners
  };
}());