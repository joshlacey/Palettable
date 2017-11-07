import React from 'react';
import Parser from 'html-react-parser';
import { replaceAll } from '../../helpers/replaceAll.js';

const Palate = (props) => {
    const htmlString = replaceAll(props.svg, 'style=""', '')
    const svg = Parser(htmlString)

    return(
      <div className={"main-palate-items"}>
        <div></div>
        <svg height='auto' id={'rePalate'} >
          {svg}
        </svg>
      </div>
    )
}

export default Palate
