// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
// Import routes
import rootRoute from './routes';

import configureStore from './store';
// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
	  <Router
        history={browserHistory}
        routes={rootRoute}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./routes'], () => {
		render();
	});
}
