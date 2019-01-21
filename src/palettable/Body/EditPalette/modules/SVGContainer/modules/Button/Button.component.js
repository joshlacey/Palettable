import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({ label, selected, handleClick }) => (
  <button
    className={`nice-button ${ selected ? 'palette-button--selected' : ''}`}
    onClick={() => handleClick()}
  >
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Button;
