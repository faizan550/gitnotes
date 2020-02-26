/** @format */

import { fetchAction } from '../../utils';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGIN_USER_INFO = 'LOGIN_USER-INFO';

export const loginAction = (token: string) => {
	return fetchAction({
		type: LOGIN_ACTION,
		endpoint: `http://localhost:4000/api/getaccesstoken/${token}`,
		verb: `GET`,
	});
};

export const loginUserInfo = (token: string) => {
	return fetchAction({
		type: LOGIN_USER_INFO,
		endpoint: `http://localhost:4000/api/user-info/${token}`,
		verb: `GET`,
	});
};
