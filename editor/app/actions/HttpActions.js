import * as API from '../API/api';

export function getFileRoot(home) {
	return function(dispatch) {
		return API.getFileRoot(home);
	}
}

export function getImageFile(path) {
	return function(dispatch) {
		return API.getImageFile(path);
	}
}
