import * as Types from './ActionTypes';

export function setFileSystem(fileSystem) {
	return {
		type: Types.SET_FILE_SYSTEM,
		fileSystem
	}
}

export function toggleFileCheck(file) {
	return {
		type: Types.TOGGLE_FILE_CHECK,
		file
	}
}