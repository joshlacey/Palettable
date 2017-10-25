import React from 'react'
import '../index.css'


const NavItem = (props) => {


  return (
    <div className={'nav-wrapper'}>
      <p className={'overlap text'}>{props.title}</p>
      <p className={'overlap text2'}>{props.title}</p>
      <p className={'overlap text3'}>{props.title}</p>
    </div>
  )
}

export default NavItem
