import React from 'react';
import PropTypes from 'prop-types';
//global modules
import ColorItem from '../../../modules/ColorItem';

function ColorTabs(props) {
  const colors = props.colors.length
    ? props.colors.map((c, i) => <ColorItem key={i} color={c} />)
    : null;
  return (
    <div>
      {props.colors.length ? <h1>Selected Colors</h1> : null}
      {colors}
    </div>
  );
}

ColorTabs.propTypes = {
	colors: PropTypes.array
}

export default ColorTabs;
