import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authorize from './Authorize';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import PalatesContainer from './main/PalatesContainer';
import SVGEdit from './palate/SVGEdit';
import Logout from './Logout'
import MyPalates from './main/MyPalates'


class Body extends React.Component {

  render () {
    const AuthSignupForm = (Authorize(SignupForm))
    const AuthLoginForm = (Authorize(LoginForm))
    const username = localStorage.getItem('username')
    return (
      <Switch>
        <Route exact path='/' render={()=><h1>HOME</h1>} />
        <Route path='/palates' component={PalatesContainer} />
        <Route path='/logout' component={Logout} />
        <Route path="/login" render={(props) => <AuthLoginForm {...props}/> }/>
        <Route path="/signup" render={(props) => <AuthSignupForm {...props}/> }/>
        <Route path='/edit' component={SVGEdit} />
        <Route path={`/${username}/palates`} component={MyPalates} />
      </Switch>
    )
  }
}

export default Body
