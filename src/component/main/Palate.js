import React from 'react';
import Parser from 'html-react-parser'

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class Palate extends React.Component {


  render(){
    const string = this.props.svg
    //debugger
    const temp = string.replaceAll('style=""', '')
    const svg = Parser(temp)

    return(
      <div>
        <svg width={'400px'} height={'400px'} id={'rePalate'} >
          {svg}
        </svg>
        <svg>

        </svg>

      </div>
    )
  }
}

export default Palate
