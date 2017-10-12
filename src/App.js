import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ImageUploader from './component/uploader/ImageUploader';
import ColorsContainer from './component/uploader/ColorsContainer';
import SVGContainer from './component/palate/SVGContainer';
import Palates from './component/main/Palates'
import SVGEdit from './component/palate/SVGEdit'

class App extends Component {
  render() {    
    return (
      <div>
        <Route exact path='/' render={()=><h1>HOME</h1>} />
        <Route exact path='/palates' component={Palates} />
        <Route exact path='/edit' component={SVGEdit} />
      </div>
    );
  }
}

export default App;
