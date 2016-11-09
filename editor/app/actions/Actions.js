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

export function addFileTabs(file) {
	return {
		type: Types.ADD_FILE_TABS,
		file
	}
}

export function removeFileTabs(file) {
	return {
		type: Types.REMOVE_FILE_TABS,
		file
	}
}

export function setActiveTab(tab) {
	return {
		type: Types.SET_ACTIVE_TAB,
		tab
	}
}

export function setImageViewerFile(base64) {
	return {
		type: Types.SET_IMAGE_VIEWER_FILE,
		base64
	}
}
