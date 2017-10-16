import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav';


import Body from './component/Body'


class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Body />
      </div>
    );
  }
}

export default App
