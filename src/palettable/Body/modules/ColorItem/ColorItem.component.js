import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../../../utils/helpers';
import './style.scss';

function ColorItem(props){
	const rgbVal = utils.hexToRgb(props.color);
	const rgbString = rgbVal ? `( ${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b} )` : '';
  return (
    <div
      height={props.height ? props.height : null}
      className={'color-item__wrapper'}
    >
      <div style={{ backgroundColor: props.color }}> </div>
      <p>Hex Value: {props.color.toUpperCase()}</p>
      <p>RGB Value: {rgbString}</p>
    </div>
  );
}

ColorItem.propTypes = {
	height: PropTypes.string,
	color: PropTypes.string,
}

export default ColorItem;
