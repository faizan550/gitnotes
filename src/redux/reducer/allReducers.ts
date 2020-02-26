/** @format */

import { combineReducers } from 'redux';
import PublicGists from './publicGistsReducer';
import loginUserInfoReducer from './loginReducer';
import UserGistReducer from './userGistsReducer';

const allReducer = combineReducers({
	publicGists: PublicGists,
	loginUserInfoReducer: loginUserInfoReducer,
	UserGistReducer: UserGistReducer
});

export default allReducer;
