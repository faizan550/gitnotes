/** @format */
import { fetchAction }  from '../../utils';
export const GET_PUBLIC_GISTS = 'GET_PUBLIC_GISTS';
export const GET_SINGLE_GIST_CONTENT = 'GET_SINGLE_GIST_CONTENT';

export const getSingleGistContent = (id: string, token: string) => {
	return fetchAction({
		type: GET_SINGLE_GIST_CONTENT,
		endpoint: `http://localhost:4000/api/content/${id}/${token}`,
		verb: 'GET'
	});
};

export const getPublicGists = () => {
	return fetchAction({
		type: GET_PUBLIC_GISTS,
		endpoint: 'http://localhost:4000/api/public-gists',
		verb: 'GET'
	});
};
