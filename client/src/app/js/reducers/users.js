import { GET_USERS, GET_USER } from '../actions/index';

const INITIAL_STATE = { all: [], user: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_USERS:
      return { ...state, all: action.payload.data.data.users };
    case GET_USER:
      return { ...state, user: action.payload.data.data.user };
    default:
      return state;
  }
}
