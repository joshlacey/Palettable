import React from 'react';
import Parser from 'html-react-parser';

const Palate = (props) => {
    const htmlString = props.svg.replace(/style=""/g, '')
    const svg = Parser(htmlString)

    return(
      <div className={"main-palate-items"}>
        <div></div>
        <svg height='100%' id={'rePalate'} >
          {svg}
        </svg>
      </div>
    )
}

export default Palate
