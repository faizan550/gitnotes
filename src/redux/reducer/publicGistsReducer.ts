/** @format */
import {
	GET_PUBLIC_GISTS,
	GET_SINGLE_GIST_CONTENT,
} from '../actions/publicGistsAction';
import { UPDATE_USER_GIST, CREATE_USER_GIST } from '../actions/userGistsAction';
import { getUpdatedPublicGistContent } from '../../utils';

const initialState = {
	listOFPublicGists: [],
	statuss: true,
	error: null,
	gistWithContent: [{}],
};

const publicGists = (state = initialState, actions: any) => {
	const { payload, type } = actions;
	switch (type) {
		case `${GET_PUBLIC_GISTS}_REQUEST`:
			return { ...state, statuss: true };
		case `${GET_PUBLIC_GISTS}_RESPONSE`:
			return { ...state, listOFPublicGists: payload, statuss: false };
		case `${GET_PUBLIC_GISTS}_ERROR`:
			return { ...state, error: payload, statuss: false };
		case `${GET_SINGLE_GIST_CONTENT}_REQUEST`:
			return { ...state, statuss: true };
		case `${GET_SINGLE_GIST_CONTENT}_RESPONSE`:
			return { ...state, gistWithContent: [...state.gistWithContent, payload], statuss : false };
		case `${GET_SINGLE_GIST_CONTENT}_ERROR`:
			return { ...state, error: payload, statuss: false };
		case `${UPDATE_USER_GIST}_RESPONSE`:
			const { result, fileName } = payload;
			const updateGist = getUpdatedPublicGistContent(result, fileName);
			const newUserGist = state.gistWithContent.filter(
				(item: any) => item.id != result.id,
			);
			return { ...state, gistWithContent: [...newUserGist, updateGist] };
		case `${CREATE_USER_GIST}_RESPONSE`: {
			return { ...state, gistWithContent: [...state.gistWithContent, payload] };
		}
		default:
			return { ...state };
	}
};

export default publicGists;
