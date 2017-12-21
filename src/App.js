import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer'


import Body from './component/Body'


class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App
