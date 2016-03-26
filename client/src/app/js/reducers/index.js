import { combineReducers } from 'redux';
import UsersReducer from './users';
import ErrorReducer from './error';

const rootReducer = combineReducers({
  users: UsersReducer,
  error: ErrorReducer

  // TODO: Add additional reducers here
});

export default rootReducer;
