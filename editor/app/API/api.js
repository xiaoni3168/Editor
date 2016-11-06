import http from './ao';

export function getFileRoot(home) {
	return http.get('/api/file/root/' + home);
}