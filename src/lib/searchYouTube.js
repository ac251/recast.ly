var searchYouTube = (options, callback) => {
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: {part: 'snippet', key: options.key, q: options.query, maxResults: options.max, type: 'video'},
    success: (data) => callback(data.items),
    error: () => console.log('houston we have a problem')
  });
};

export default searchYouTube;
