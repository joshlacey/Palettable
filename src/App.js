import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import ImageUploader from './component/uploader/ImageUploader';
import ColorsContainer from './component/uploader/ColorsContainer';
import SVGContainer from './component/palate/SVGContainer';
import Palates from './component/main/Palates';
import SVGEdit from './component/palate/SVGEdit';
import Nav from './component/Nav';
import { loginUser, logoutUser, createUser } from './actions/userServices';
import Authorize from './component/Authorize';
import LoginForm from './component/LoginForm'
import SignupForm from './component/SignupForm'
import RePalate from './component/main/RePalate'

class App extends Component {

  state = {
    user: {},
    isLoggedIn: !!localStorage.getItem('jwtToken')
  }



  login = (loginParams) => {
    loginUser(loginParams)
      .then((user) => {
        console.log(user)
        user.jwt !== undefined ? localStorage.setItem("jwtToken", user.jwt) : null
        this.setState({
          user
        })
      })

  }

  logout = () => {
    logoutUser()
    this.setState({
      user: null
    })
  }

  signUp = (singupParams) => {
    createUser(singupParams)
    .then((user) => {
      if (user.jwt !== undefined){
        localStorage.setItem("jwtToken", user.jwt)
        this.setState({ user })
      } else {
        alert(user.message)
      }
    })
  }



  render() {
    console.log("logged in ?", this.state.isLoggedIn)
    const AuthLoginForm = Authorize(LoginForm)

    return (
      <div>
        <Nav />
        <Route exact path='/' render={()=><h1>HOME</h1>} />
        <Route exact path='/logout' render={() =>{
            this.logout()
            return <Redirect to='/palates' />
        }} />
        <Route exact path="/login" render={(props) => <AuthLoginForm onLogin={this.login} {...props} />}/>
        <Route exact path="/signup" render={(props) => <SignupForm onSignup={this.signUp} {...props} />}/>
        <Route exact path='/palates' component={Palates} />
        <Route exact path='/palates/:id' component={RePalate} />
        <Route exact path='/edit' component={SVGEdit} />
      </div>
    );
  }
}

export default App;