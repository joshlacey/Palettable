import React from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../actions/userServices';


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
      <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="username" onChange={this.handleUsernameChange} value={this.state.username}/>
          <input type="password" placeholder="password" onChange={this.handlePasswordChange} value={this.state.password}/>
          <input type="submit" value="Submit"/>
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

export default connect(null, mapDispatchToProps)(LoginForm)
