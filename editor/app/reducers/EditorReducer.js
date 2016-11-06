import * as Types from '../actions/ActionTypes';

const initialState = {
	fileSystem: []
}

export default function editor(state = initialState, action) {
	switch(action.type) {
		case Types.SET_FILE_SYSTEM:
			return Object.assign({}, state, {
				fileSystem: action.fileSystem
			});
		case Types.TOGGLE_FILE_CHECK:
			return Object.assign({}, state, {
				fileSystem: state.fileSystem.map((file, index) => {
					if(file.name === action.file.name) {
						return Object.assign({}, file, {
							checked: true
						})
					} else {
						return Object.assign({}, file, {
							checked: false
						})
					}
				})
			})
		default:
			return state;
	}
}