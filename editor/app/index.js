import React from 'react';
import { hashHistory, Router, Route } from 'react-router';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore from './stores';

import app from './reducers';

let store = configureStore(app);

const rootRoute = {
	path: '/',
	component: require('./RootPage').default,
	childRoutes: []
}

render(
	<div>
		<Provider store={ store }>
			<Router history={ hashHistory } routes={ rootRoute }></Router>
		</Provider>
	</div>,
	document.getElementById('root')
)