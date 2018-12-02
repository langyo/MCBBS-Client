import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import <%= componentName %> from './<%= componentName %>.js';
import configureStore from './store';

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
	<Provider store={store}>
		<<%= componentName %> />
	</Provider>,
	document.getElementById('root')
);