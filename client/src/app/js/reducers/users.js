import { GET_USERS, GET_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER} from '../actions/constants';

const INITIAL_STATE = { all: [], user: null, currentUser: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_USERS:
      return { ...state, all: action.payload.data.users };
    case GET_USER:
      return { ...state, user: action.payload.data.user };
    case LOGIN_USER:
      return { ...state, currentUser: action.payload.data.user };
    case UPDATE_USER:
      return { ...state, currentUser: action.payload.data.user };
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    default:
      return state;
  }
}
