import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getUserName } from '../../utils/helpers';
//import Home from './Home';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Logout from './Logout';
import Palettes from './Palettes';
import EditPalette from './EditPalette';
import MyPalettes from './MyPalettes';

export default function Body() {
	const username = getUserName();
	return (
		<Switch>
			<Route exact path='/' component={Palettes} />
			<Route path='/palates' component={Palettes} />
			<Route path="/login" component={LoginForm}/>
			<Route path="/signup" component={SignupForm}/>
			<Route path='/logout' component={Logout} />
			<Route path='/edit' component={EditPalette} />
			<Route path={`/${username}/palates`} component={MyPalettes} />
		</Switch>
	);
}
