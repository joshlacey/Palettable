import React from 'react';
import Parser from 'html-react-parser';
import { replaceAll } from '../../helpers/replaceAll.js';

class Palate extends React.Component {


  render(){
    const string = this.props.svg
    const temp = replaceAll(string, 'style=""', '')
    const svg = Parser(temp)

    return(
      <div className={"main-palate-items"}>
        <div></div>
        <svg height='auto' id={'rePalate'} >
          {svg}
        </svg>
      </div>
    )
  }
}

export default Palate
