import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';

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
  constructor() {
    super();
    this.changeVideo = this.changeVideo.bind(this);
    this.state = {
      videos: exampleVideoData,
      video: exampleVideoData[0],
    };

  }
  
  changeVideo(video) {
    this.setState({
      video: video
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><em>videoPlayer</em><VideoPlayer video={this.state.video} /></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em><VideoList videos={this.state.videos}  onClick={this.changeVideo} /></h5></div>
          </div>
        </div>
      </div>
    );

  }

}

export default App;