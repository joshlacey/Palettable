import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'
import NavItem from './NavItem'

class Nav extends React.Component {

  componentDidMount = () => {
    const navItems = document.querySelectorAll('.nav-wrapper')
    if(!!navigator.userAgent.match(/iPad/g)) {
      null
    } else {
      navItems.forEach(c => c.addEventListener('mouseenter', this.hoverin))
      navItems.forEach(c => c.addEventListener('mouseleave', this.hoverout))
    }
  }

  hoverin (event) {
    event.target.children[1].style.transform="translate(60px, 30px)"
    event.target.children[2].style.transform="translate(120px, 60px)"
  }

  hoverout (event) {
    event.target.children[1].style.transform="translate(0, 0)"
    event.target.children[2].style.transform="translate(0, 0)"
  }

  render() {
    const username = localStorage.getItem('username')
    const hasToken = !!localStorage.getItem('jwtToken')
    return(
      <div className={'navbar'} >
        <Link to='/palates'>
          <div className={'nav-wrapper'}>
            <p className={'overlap text'}>Palatable</p>
            <p className={'overlap text2'}>Palatable</p>
            <p className={'overlap text3'}>Palatable</p>
          </div>
        </Link>
        <Link to='/edit'>
          <div className={'nav-item nav-item-red'}>Create New</div>
        </Link>
        {hasToken ? <Link to={`/${username}/palates`}><div className={'nav-item nav-item-green'}>Your Palates</div></Link> : null }
        {hasToken ? <Link to='/logout'><div className={'nav-item nav-item-blue'}>Logout</div></Link> : <Link to='/login'><div className={'nav-item nav-item-green'}>Login</div></Link> }
        {hasToken ? null : <Link to='/signup'><div className={'nav-item nav-item-blue'}>Signup</div></Link> }

      </div>
    )
  }
}

export default Nav
