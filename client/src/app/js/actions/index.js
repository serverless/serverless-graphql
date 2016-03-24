import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// TODO: Replace with your API URL
const API_URL = 'https://example.com/stage';

export function createUser(user) {
  const query = { "query":
    `mutation createNewUser {
      user: createUser (
        name: "${user.name}"
        email: "${user.email}"
        password: "${user.password}"
      )
      {
        id
        name
        email
      }
    }`
  };
  const request = axios.post(`${API_URL}/private/`, JSON.stringify(query));

  return {
    type: CREATE_USER,
    payload: request
  };
}

export function fetchUsers() {
  const query = { "query":
    `{
      users {
        id
        name
        email
      }
    }`
  };
  const request = axios.post(`${API_URL}/public/`, JSON.stringify(query));

  return {
    type: FETCH_USERS,
    payload: request
  };
}

export function fetchUser(id) {
  const query = { "query":
    `{
      user(id: "${id}")
      {
        id
        name
        email
      }
    }`
  };
  const request = axios.post(`${API_URL}/public/`, JSON.stringify(query));

  return {
    type: FETCH_USER,
    payload: request
  };
}

export function updateUser(user) {
  const query = { "query":
    `mutation updateExistingUser {
      user: updateUser (
        id: "${user.id}"
        name: "${user.name}",
        email: "${user.email}"
        password: "${user.password}"
      )
      {
        id
        name
        email
      }
    }`
  };
  const request = axios.post(`${API_URL}/private/`, JSON.stringify(query));

  return {
    type: UPDATE_USER,
    payload: request
  }
}

export function deleteUser(id) {
  const query = { "query":
    `mutation deleteExistingUser {
      user: deleteUser (
        id: "${id}"
      )
      {
        id
      }
    }`
  };
  const request = axios.post(`${API_URL}/private/`, JSON.stringify(query));

  return {
    type: DELETE_USER,
    payload: request
  }
}
