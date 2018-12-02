import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => (noop) => noop);

const createReducers = (asyncReducers) => combineReducers({ ...asyncReducers });

export default function configureStore(initialState = {}) {
	const middlewares = [
		sagaMiddleware,
	];

	const enhancers = [
		applyMiddleware(...middlewares),
		devtools(),
	];

	const store = createStore(
		createReducers(reducers),
		initialState,
		compose(...enhancers)
	);

	// Make reducers hot reloadable, see http://mxs.is/googmo
	if (module.hot) {
		System.import('./reducers').then((reducerModule) => {
			const nextReducers = createReducers(reducerModule.default);
			store.replaceReducer(nextReducers);
		});
	}

	sagas.map(sagaMiddleware.run);

	return store;
}
