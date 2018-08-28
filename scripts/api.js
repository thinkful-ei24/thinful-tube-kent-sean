const api = (function() {
  const API_KEY = 'AIzaSyCs5QJ5fnvayDdaIhZzwTKORJ7JN-TUOvc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: `${searchTerm}`,
      part: 'snippet',
      key: `${API_KEY}`
    }
    $.getJSON(BASE_URL, query, callback);
  };
  
  return {
    fetchVideos
  };
}());