import { GET_USERS, GET_USER, LOGIN_USER, LOGOUT_USER } from '../actions/constants';

const INITIAL_STATE = { all: [], user: null, loggedInUsername: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_USERS:
      return { ...state, all: action.payload.data.users };
    case GET_USER:
      return { ...state, user: action.payload.data.user };
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.data.user.token);
      return { ...state, loggedInUsername: action.payload.data.user.username };
    case LOGOUT_USER:
      localStorage.removeItem('jwt');
      return { ...state, loggedInUsername: null };
    default:
      return state;
  }
}
