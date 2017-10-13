import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {

  render() {
    const styling = {display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'}
    return(
      <div style={styling}>
        <NavLink to='/palates'>Palates</NavLink>
        <NavLink to='/logout'>Logout</NavLink>
        <NavLink to='/edit'>Edit??</NavLink>
        <NavLink to='/signup'>Signup</NavLink>
      </div>
    )
  }
}

export default Nav
