const videoList = (function() {
    
    const decorateResponse = function(response) {
        let decoratedVideos = response.items.map(video => {
          return {
            id: video.id.videoId,
            title:video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url
          };
        });
      
        store.setVideos(decoratedVideos);
        videoList.render();
      };

    const generateVideoItemHtml = function(video) {
        return `<li>
          <img src=${video.thumbnail}>
          <a src="#">${video.title}</a>
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
          field.val("");
      
          api.fetchVideos(searchTerm, decorateResponse);
        });
      };

    const bindEventListeners = function() {
        handleFormSubmit();
    }

    return {
        render,
        bindEventListeners
    }
}());