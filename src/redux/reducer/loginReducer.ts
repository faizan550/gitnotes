/** @format */ 
import { getAccessToken }  from '../../utils';
import { LOGIN_ACTION, LOGIN_USER_INFO } from '../actions/loginAction';

const initialState = {
	userInfo: {},
	accessToken: localStorage.getItem('AccessToken'),
	status: false,
	error: null
};

const loginUserInfoReducer = (state = initialState, action: any) => {
	const { payload, type } = action;
	switch (type) {
		case `${LOGIN_ACTION}_REQUEST`:
			return { ...state, status: true };
		case `${LOGIN_ACTION}_RESPONSE`:
			localStorage.setItem('AccessToken', getAccessToken(payload));
			localStorage.setItem('status', 'true');
			return { ...state, status: false, accessToken: getAccessToken(payload)};
		case `${LOGIN_ACTION}_ERROR`:
			return { ...state, status: false, error: payload };
		case `${LOGIN_USER_INFO}_REQUEST`:
			return { ...state, status: true };
		case `${LOGIN_USER_INFO}_RESPONSE`:
			return { ...state, userInfo: payload, status: false };
		case `${LOGIN_USER_INFO}_ERROR`:
			return { ...state, status: false, error: payload };
		case `LOG_OUT`:
			return { initialState };
		default:
			return { ...state };
	}
};
export default loginUserInfoReducer;
