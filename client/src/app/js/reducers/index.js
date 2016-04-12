import { combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux'

import UsersReducer from './users';
import ErrorReducer from './error';

export default combineReducers({
  users: UsersReducer,
  error: ErrorReducer,
  routing: routerReducer
});

