import React, { Fragment } from 'react';
import './App.css';
import Nav from './palettable/Nav';
import Footer from './palettable/Footer';
import Body from './palettable/Body';

export default function App(){
	return (
		<Fragment>
			<Nav />
			<Body />
			<Footer />
		</Fragment>
	);
} 
