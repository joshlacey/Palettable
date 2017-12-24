import React from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../actions/userServices';
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component{

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (event) => {
      event.preventDefault()
      const loginParams = { username: this.state.username, password: this.state.password}
      this.props.login(loginParams)
      this.setState({
        username: "",
        password: ""
      })
    }


    handleUsernameChange = (event) => {
      this.setState({
        username: event.target.value
      })

    }


    handlePasswordChange = (event) => {
      this.setState({
        password: event.target.value
      })

    }

  render() {
    return(
      <form className={'login-form'} onSubmit={this.handleSubmit}>
          <h1>login</h1>
          <input type="text" placeholder="username" onChange={this.handleUsernameChange} value={this.state.username}/><br/>
          <input type="password" placeholder="password" onChange={this.handlePasswordChange} value={this.state.password}/><br/>
          <button className={'nice-button'} type="submit">Submit</button>
        </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (loginParams) => {
      dispatch(loginUser(loginParams))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
