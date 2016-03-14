import { FETCH_USERS, FETCH_USER } from '../actions/index';

const INITIAL_STATE = { all: [], user: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.data.data.user };
    case FETCH_USERS:
      return { ...state, all: action.payload.data.data.users };
    default:
      return state;
  }
}
