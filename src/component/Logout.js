import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userServices';

class Logout extends React.Component {
  render(){
    this.props.logout()
    return <Redirect to='/palates' />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout)
