import { combineReducers } from 'redux';

import editor from './EditorReducer';

export function createReducer(asyncReducers) {
	return combineReducers({
		...asyncReducers,
		editor
	});
}

const app = new createReducer();
export default app;