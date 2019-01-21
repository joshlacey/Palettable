/*globals document navigator*/
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../../utils/helpers';
import './style.scss';

export default class Nav extends Component {

  componentDidMount = () => {
    const navItems = document.querySelectorAll('.nav-wrapper')
    if(navigator.userAgent.match(/iPad/g)) {
      return null;
    } else {
      navItems.forEach(item => {
        item.addEventListener('mouseenter', this.hoverin);
        item.addEventListener('mouseleave', this.hoverout);
      });
    }
  }

  hoverin (event) {
    const { children } = event.target;
    children[1].style.transform="translate(60px, 30px)"
    children[2].style.transform="translate(120px, 60px)"
  }

  hoverout (event) {
    const { children } = event.target;
    children[1].style.transform="translate(0, 0)"
    children[2].style.transform="translate(0, 0)"
  }

  render() {
    const username = utils.getUserName();
    const hasToken = utils.getToken();
    return(
      <div className='navbar' >
        <Link to='/palates'>
          <div className='nav-wrapper'>
            <p className='overlap text'>Palettable</p>
            <p className='overlap text2'>Palettable</p>
            <p className='overlap text3'>Palettable</p>
          </div>
        </Link>
        <Link to='/edit'>
          <div className='nav-item nav-item__red'>
            Create New
          </div>
        </Link>
        {hasToken ?
          <Fragment>
            <Link to={`/${username}/palates`}>
              <div className={'nav-item nav-item__green'}>
                Your Palettes
              </div>
            </Link>
            <Link to='/logout'>
              <div className='nav-item nav-item__blue'>
                Logout
              </div>
            </Link>
          </Fragment>
          :
          <Fragment>
            <Link to='/login'>
              <div className='nav-item nav-item__green'>
                Login
              </div>
            </Link>
            <Link to='/signup'>
              <div className='nav-item nav-item__blue'>
                Signup
              </div>
            </Link>
          </Fragment>
        }
      </div>
    )
  }
}
