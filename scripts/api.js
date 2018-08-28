// eslint-disable-next-line no-unused-vars
const api = (function() {
  const API_KEY = 'AIzaSyCs5QJ5fnvayDdaIhZzwTKORJ7JN-TUOvc';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function(searchTerm, pageToken, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      pageToken: pageToken
    };
    $.getJSON(BASE_URL, query, callback);
  };
  
  return {
    fetchVideos
  };
}());