/** @format */ import {
	GET_USER_GISTS,
	GET_USER_STARRED_GISTS,
	STAR_GIST,
	GIST_STAR_STATUS,
	UNSTAR_GIST,
	DELETE_USER_GIST,
	CREATE_USER_GIST,
	UPDATE_USER_GIST,
} from '../actions/userGistsAction';
import { getUpdatedPublicGistContent } from '../../utils';

const initialState = {
	userGists: [],
	userStarredGists: [],
	gistStarStatus: {},
	status: false,
	error: null,
};

const GistActionReducer = (state = initialState, action: any) => {
	console.log(action);
	const { payload, type } = action;
	switch (type) {
		case `${GET_USER_GISTS}_REQUEST`:
			return { ...state, status: true };
		case `${GET_USER_GISTS}_RESPONSE`:
			return { ...state, userGists: payload, status: false };
		case `${GET_USER_GISTS}_ERROR`:
			return { ...state, error: payload, status: false };
		case `${GET_USER_STARRED_GISTS}_REQUEST`:
			return { ...state, status: true };
		case `${GET_USER_STARRED_GISTS}_RESPONSE`:
			return { ...state, userStarredGists: payload, status: false };
		case `${GET_USER_STARRED_GISTS}_ERROR`:
			return { ...state, status: false, error: payload };
		case `${GIST_STAR_STATUS}_REQUEST`:
			return { ...state, status: true };
		case `${GIST_STAR_STATUS}_RESPONSE`:
			return { ...state, gistStarStatus: payload, status: false };
		case `${GIST_STAR_STATUS}_ERROR`:
			return { ...state, error: payload, status: false };
		case `${UNSTAR_GIST}_REQUEST`:
			return { ...state, status: true };
		case `${UNSTAR_GIST}_RESPONSE`:
			const { id } = payload;
			const updatedStaredGists = state.userStarredGists.filter(
				(item: any) => item.id != id,
			);
			return {
				...state,
				gistStarStatus: {},
				userStarredGists: updatedStaredGists,
				status: false,
			};
		case `${UNSTAR_GIST}_ERROR`:
			return { ...state, status: false, error: payload };
		case `${STAR_GIST}__REQUEST`:
			return { ...state, status: true };
		case `${STAR_GIST}_RESPONSE`:
			const { staredGist, staredGistStatus } = payload;
			return {
				...state,
				userStarredGists: [...state.userStarredGists, staredGist],
				gistStarStatus: staredGistStatus,
				status: false,
			};
		case `${STAR_GIST}__ERROR`:
			return { ...state, status: false, error: payload };
		case `${DELETE_USER_GIST}_REQUEST`:
			return { ...state, status: true };
		case `${DELETE_USER_GIST}_RESPONSE`:
			const { deletedGistId } = payload;
			const updatedUserGists = state.userGists.filter(
				(gist: any) => gist.id != deletedGistId,
			);
			return {
				...state,
				status: false,
				userGists: updatedUserGists,
			};
		case `${DELETE_USER_GIST}_ERROR`:
			return { ...state, error: payload, status: false };
		case `${CREATE_USER_GIST}_REQUEST`:
			return { ...state, status: true };
		case `${CREATE_USER_GIST}_RESPONSE`: {
			return {
				...state,
				userGists: [...state.userGists, payload],
				status: false,
			};
		}
		case `${CREATE_USER_GIST}_ERROR`:
			return { ...state, error: payload, status: false };
		case `${UPDATE_USER_GIST}_REQUEST`:
			return { ...state, status: true };
		case `${UPDATE_USER_GIST}_RESPONSE`:
			const { fileName, result } = payload;
			const updateGist = getUpdatedPublicGistContent(result, fileName);
			console.log(updateGist);
			const newUserGist = state.userGists.filter(
				(item: any) => item.id != result.id,
			);
			return { ...state, userGists: [...newUserGist, updateGist] };
		case `${UPDATE_USER_GIST}_ERROR`:
			return { ...state, status: false, error: payload };
		default:
			return { ...state };
	}
};
export default GistActionReducer;
