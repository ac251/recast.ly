

import searchYouTube from './lib/searchYouTube.js';

// TODO: Render the `App` component to the DOM
import App from './components/App.js';

ReactDOM.render(<App searchYouTube={searchYouTube}/>, document.getElementById('app'));

