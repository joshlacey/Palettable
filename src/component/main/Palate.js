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
      <div className={"main-palate-items"}>
        <div>
        </div>
        <svg width={'100%'} height={'auto'} id={'rePalate'} >
          {svg}
        </svg>
      </div>
    )
  }
}

export default Palate
