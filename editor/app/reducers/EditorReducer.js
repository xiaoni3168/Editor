import * as Types from '../actions/ActionTypes';

const initialState = {
	fileSystem: [],
	fileTabs: [],
	activeTab: {},
	base64Image: null
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
			});
		case Types.ADD_FILE_TABS:
			return Object.assign({}, state, {
				fileTabs: [
					...state.fileTabs,
					action.file
				]
			});
		case Types.REMOVE_FILE_TABS:
			let arr = [];
			state.fileTabs.map((file) => {
				if(file.path !== action.file.path) {
					arr.push(file);
				}
			});
			return Object.assign({}, state, {
				fileTabs: arr
			});
		case Types.SET_ACTIVE_TAB:
			return Object.assign({}, state, {
				activeTab: action.tab
			});
		case Types.SET_IMAGE_VIEWER_FILE:
			return Object.assign({}, state, {
				base64Image: action.base64
			});
		default:
			return state;
	}
}
