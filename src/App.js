import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ImageUploader from './component/uploader/ImageUploader';
import ColorsContainer from './component/uploader/ColorsContainer';
import SVGContainer from './component/palete/SVGContainer';
import Paletes from './component/main/Paletes'

class App extends Component {
  render() {
    const styling = {padding: '2em', display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '1em'}
    return (
      <div>
        <Route exact path='/' render={()=><h1>HOME</h1>} />
        <Route exact path='/paletes' component={Paletes} />
        <div style={styling}>
          <SVGContainer />
          <div>
            <ImageUploader />
            <p style={{fontSize: '70%'}}>google image: https://wallpaperscraft.com/image/google_search_logo_summer_drawing_26168_602x339.jpg</p>
            <ColorsContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
