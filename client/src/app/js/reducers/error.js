import { ERROR, RESET_ERROR } from '../actions/constants';

const INITIAL_STATE = { message: '' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ERROR:
      return { ...state, message: action.payload };
    case RESET_ERROR:
      return { ...state, message: '' };
    default:
      return state;
  }
}
