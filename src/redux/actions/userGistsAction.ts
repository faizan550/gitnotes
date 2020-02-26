/** @format */

import { fetchAction } from '../../utils';
export const GET_USER_GISTS = 'GET_USER_GISTS';
export const GET_USER_STARRED_GISTS = 'GET_USER_STARRED_GISTS';
export const STAR_GIST = 'STAR_GIST';
export const GIST_STAR_STATUS = 'GIST_STAR_STATUS';
export const UNSTAR_GIST = 'UNSTAR_GIST';
export const DELETE_USER_GIST = 'DELETE_USER_GIST';
export const CREATE_USER_GIST = 'CREATE_USER_GIST';
export const UPDATE_USER_GIST = 'UPDATE_USER_GIST';

export const getUserGists = (token: string) => {
	return fetchAction({
		type: GET_USER_GISTS,
		endpoint: `http://localhost:4000/api/user/gists/${token}`,
		verb: 'GET',
	});
};

export const getUserStarredGists = (token: string) => {
	return fetchAction({
		type: GET_USER_STARRED_GISTS,
		endpoint: `http://localhost:4000/api/gists/starred/${token}`,
		verb: 'GET',
	});
};

export const starAGist = (token: string, id: string) => {
	return fetchAction({
		type: STAR_GIST,
		endpoint: `http://localhost:4000/api/${id}/${token}/star`,
		verb: 'PUT',
	});
};

export const checkGistIsStarred = (token: string, id: string) => {
	return fetchAction({
		type: GIST_STAR_STATUS,
		endpoint: `http://localhost:4000/api/${id}/${token}/starred`,
		verb: 'GET',
	});
};

export const unStarAGist = (token: string, id: string) => {
	return fetchAction({
		type: UNSTAR_GIST,
		endpoint: `http://localhost:4000/api/${id}/${token}/unstar`,
		verb: 'DELETE',
	});
};

export const deleteUserGist = (token: string, id: string) => {
	return fetchAction({
		type: DELETE_USER_GIST,
		endpoint: `http://localhost:4000/api/${id}/${token}/delete`,
		verb: 'DELETE',
	});
};

export const createUserGist = (token: string, object: any) => {
	console.log(object);
	return fetchAction({
		type: CREATE_USER_GIST,
		endpoint: `http://localhost:4000/api/create/${token}/${object}`,
		verb: 'POST',
		body: object,
	});
};

export const updateUserGist = (
	token: string,
	object: any,
	id: string,
	filename: any,
) => {
	console.log(object);
	return fetchAction({
		type: UPDATE_USER_GIST,
		endpoint: `http://localhost:4000/api/update/${token}/${object}/${id}/${filename}`,
		verb: 'PATCH',
		body: object,
	});
};
