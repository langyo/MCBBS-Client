import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
<% namespaceReducers.forEach(function (item) {%>
import <%= item.name %>Reducer from '<%= item.importPath %>';
<%})%>
<% namespaceSagas.forEach(function (item) {%>
import <%= item.name %>Sagas from '<%= item.importPath %>';
<%})%>
const reducers = {
<% namespaceReducers.forEach(function (item) {%>
<%= item.name %>: <%= item.name %>Reducer,
<%})%>
};
const sagas = [
<% namespaceSagas.forEach(function (item) {%>
	...<%= item.name %>Sagas,
<%})%>
];

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => (noop) => noop);

const createReducers = (asyncReducers) => {
	return combineReducers({
		...asyncReducers,
	});
};

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

	sagas.map(sagaMiddleware.run);

	return store;
}
