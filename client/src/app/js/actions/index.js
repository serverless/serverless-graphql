import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';

// TODO: Replace with your API URL
const API_URL = 'https://example.com/stage';

export function fetchUsers() {
  const query = { "query": "{ users { id, email } }" };
  const request = axios.post(`${API_URL}/public/`, JSON.stringify(query));

  return {
    type: FETCH_USERS,
    payload: request
  };
}

export function fetchUser(id) {
  const query = { "query": "{ user(id: \"" + id +  "\") { id, name } }" };
  const request = axios.post(`${API_URL}/public/`, JSON.stringify(query));

  return {
    type: FETCH_USER,
    payload: request
  };
}
