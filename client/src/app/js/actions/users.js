import 'whatwg-fetch';
import { API_URL } from './index';

import {
  ERROR,
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from './constants';

export function createUser(user) {
  const query = { "query":
    `mutation createNewUser {
      user: createUser (
        name: "${user.name}",
        username: "${user.username}"
        email: "${user.email}"
        password: "${user.password}"
      )
      {
        id
        name
        username
        email
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_USER,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getUsers() {
  const query = { "query":
    `{
      users {
        id
        name
        username
        email
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_USERS,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getUser(username) {
  const query = { "query":
    `{
      user(username: "${username}")
      {
        id
        name
        username
        email
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_USER,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateUser(user) {
  const query = { "query":
    `mutation updateExistingUser {
      user: updateUser (
        id: "${user.id}"
        name: "${user.name}"
        username: "${user.username}"
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

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_USER,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
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

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: DELETE_USER,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
