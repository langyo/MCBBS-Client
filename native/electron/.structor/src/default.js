import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import PageForDesk from './PageForDesk.js';
import configureStore from '../app/store.js';

let store;

const render = () => {

	ReactDOM.render(
		<Provider store={store}>
			<PageForDesk />
		</Provider>,
		document.getElementById('content')
	);

};

window.__createPageDesk = function () {

	store = configureStore();

	render();

	window.pageReadyState = 'initialized';

};

if (module.hot) {
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./PageForDesk.js'], () => {
		render();
	});
}

window.pageReadyState = 'ready';

