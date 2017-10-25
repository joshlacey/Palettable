import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'
import NavItem from './NavItem'

class Nav extends React.Component {

  componentDidMount = () => {
    const navItems = document.querySelectorAll('.nav-wrapper')
    navItems.forEach(c => c.addEventListener('mouseenter', this.hoverin))
    navItems.forEach(c => c.addEventListener('mouseleave', this.hoverout))
  }

  hoverin (event) {
    event.target.children[0].style.transform="translate(-40px, 0)"
    event.target.children[2].style.transform="translate(40px, 0)"
  }

  hoverout (event) {
    event.target.children[0].style.transform="translate(0, 0)"
    event.target.children[2].style.transform="translate(0, 0)"
  }

  render() {
    const username = localStorage.getItem('username')
    const hasToken = !!localStorage.getItem('jwtToken')
    return(
      <div className={'navbar'} >
        <Link to='/palates'>
          <NavItem title={'Palates'}/>
        </Link>
        <Link to='/edit'>
          <NavItem title={'Create New'}/>
        </Link>
        {hasToken ? <Link to='/logout'><NavItem title={'Logout'}/></Link> : <Link to='/login'><NavItem title={'Login'}/></Link> }
        {hasToken ? null : <Link to='/signup'><NavItem title={'Signup'}/></Link> }
        {hasToken ? <Link to={`/${username}/palates`}><NavItem title={'Your Palates'}/></Link> : null }
      </div>
    )
  }
}

export default Nav
