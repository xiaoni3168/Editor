import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
	let store = compose(applyMiddleware(thunk))(createStore)(initialState);
	return store;
}