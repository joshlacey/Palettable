import React from 'react';
import '../../index.css';

const ColorItemComp = (props) => {

  const hexToRgb = (hex) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `( ${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)} )` : null;
  }

  return (
    <div height={ props.height ? props.height : null } className={'color-item-wrapper'}>
      <div style={{backgroundColor: props.color}}> </div>
      <p>Hex Value: {props.color.toUpperCase()}</p>
      <p>RGB Value: {hexToRgb(props.color)}</p>
    </div>
  )
}

export default ColorItemComp
