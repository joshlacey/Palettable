import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

  render() {
    const username = localStorage.getItem('username')
    const hasToken = !!localStorage.getItem('jwtToken')
    const styling = {display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'}
    return(
      <div style={styling}>
        <Link to='/palates'>Palates</Link>
        <Link to='/edit'>Create New</Link>
        {hasToken ? <Link to='/logout'>Logout</Link> : <Link to='/login'>Login</Link> }
        {hasToken ? null : <Link to='/signup'>Signup</Link> }
        {hasToken ? <Link to={`/${username}/palates`}>My Palates</Link> : null }
      </div>
    )
  }
}

export default Nav
