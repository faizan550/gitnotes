/** @format */
import { createStore, applyMiddleware } from 'redux';
import allReducer from './reducer/allReducers';
import { middleWare } from './middleware';

const store = createStore(allReducer, applyMiddleware(middleWare));

export default store;
