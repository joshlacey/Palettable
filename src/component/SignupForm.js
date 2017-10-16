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
      console.log('signupForm', signupParams)
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
    signUp: (signupParams) => {
      dispatch(createUser(signupParams))
    }
  }
}


export default connect(null, mapDispatchToProps)(SignupForm)
