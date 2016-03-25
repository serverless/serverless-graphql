import { combineReducers } from 'redux';
import UsersReducer from './users';

const rootReducer = combineReducers({
  users: UsersReducer

  // TODO: Add additional reducers here

});

export default rootReducer;
