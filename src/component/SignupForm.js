import React from 'react'
import { connect } from 'react-redux';
import { createUser } from '../actions/userServices';


class SignupForm extends React.Component{

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (event) => {
      event.preventDefault()
      const signupParams = { username: this.state.username, password: this.state.password}
      this.props.signUp(signupParams)
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
          <h1>signup</h1>
          <input type="text" placeholder="username" onChange={this.handleUsernameChange} value={this.state.username}/><br/>
          <input type="password" placeholder="password" onChange={this.handlePasswordChange} value={this.state.password}/><br/>
          <button className={'nice-button'} type="submit">Submit</button>
        </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (signupParams) => {
      dispatch(createUser(signupParams))
    }
  }
}


export default connect(null, mapDispatchToProps)(SignupForm)
