import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import AllPalettes from './AllPalettes';

export default function Palettes(){
	return (
		<Fragment>
			<Switch>
				<Route exact path="/palates" component={AllPalettes} />
				<Route path="/palates/:id" component={Palette} />
			</Switch>
		</Fragment>
	);
}
