import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
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

export function getUsers() {
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
    type: GET_USERS,
    payload: request
  };
}

export function getUser(id) {
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
    type: GET_USER,
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
