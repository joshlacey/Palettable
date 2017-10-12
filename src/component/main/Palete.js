import React from 'react';
import Parser from 'html-react-parser'

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class Palete extends React.Component {


  render(){
    const string = this.props.svg.data.svg
    const temp = string.replaceAll('style=""', '')
    const svg = Parser(temp)

    return(
      <div>
        {svg}
      </div>
    )
  }
}

export default Palete
