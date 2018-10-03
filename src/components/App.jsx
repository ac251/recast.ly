import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
//import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

/*var App = () => (
  <div>
    <nav className="navbar">
      <div className="col-md-6 offset-md-3">
        <div><h5><em>search</em> view goes here</h5></div>
      </div>
    </nav>
    <div className="row">
      <div className="col-md-7">
        <div><h5><em>videoPlayer</em><VideoPlayer video={exampleVideoData[0]} /></h5></div>
      </div>
      <div className="col-md-5">
        <div><h5><em>videoList</em><VideoList videos={exampleVideoData} /></h5></div>
      </div>
    </div>
  </div>
);*/

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
// export default App;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.lastStr = '';
    this.state = {
      videos: [{snippet: {title: null, description: null, thumbnails: {default: {url: null}} }, id: {videoId: null}}],
      video: {snippet: {title: null, description: null, thumbnails: {default: {url: null}} }, id: {videoId: null}},
      search: '',
      lastSearch: 0,
    };

  }
  runSearch() {
    var options = {
      key: YOUTUBE_API_KEY,
      query: this.state.search,
      maxResults: 5
    };
    this.props.searchYouTube(options, (data) => {
      this.setState({ videos: data, lastSearch: Date.now() });
    });
  }
  
  changeVideo(video) {
    this.setState({
      video: video
    });
  }

  updateSearchTerm(event) {
    this.setState({
      search: event.target.value,
    });
  }
  
  submitSearchTerm() {
    this.runSearch();
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search /*value={this.state.search}*/ update={(event)=>this.updateSearchTerm(event)} submit={()=>this.submitSearchTerm()}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} onClick={(video) =>this.changeVideo(video)} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    var options = {
      key: YOUTUBE_API_KEY,
      query: 'cats',
      maxResults: 5
    };
    this.props.searchYouTube(options, (data)=> {
      this.setState({ videos: data, video: data[0] });
    });
  }
  componentDidUpdate(prevState) {
    var waitTime = 500;
    if (this.state.search) {    
      if ((this.state.search !== prevState.search) && Date.now() - this.state.lastSearch > waitTime) {
        this.runSearch();
      } else {
        setTimeout( () => { this.runSearch(); }, waitTime - (Date.now() - this.state.lastSearch));
      }
    }
  }
  
  
}

export default App;