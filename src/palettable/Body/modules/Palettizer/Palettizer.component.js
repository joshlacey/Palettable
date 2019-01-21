import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import './style.scss';

function Palettizer(props) {
  const htmlString = props.svg.replace(/style=""/g, '');
  const svg = Parser(htmlString);
  return (
    <div className='palettizer'>
      <div/>
      <svg height="100%" id={'rePalate'}>
        {svg}
      </svg>
    </div>
  );
}

Palettizer.propTypes = {
	svg: PropTypes.string
}

export default Palettizer;
