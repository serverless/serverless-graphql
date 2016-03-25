import 'whatwg-fetch';

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

  return (dispatch) => fetch(`${API_URL}/private/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_USER,
    payload: json
  }));
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

  return (dispatch) => fetch(`${API_URL}/public/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_USERS,
    payload: json
  }));
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

  return (dispatch) => fetch(`${API_URL}/public/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_USER,
    payload: json
  }));
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

  return (dispatch) => fetch(`${API_URL}/private/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_USER,
    payload: json
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

  return (dispatch) => fetch(`${API_URL}/private/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: DELETE_USER,
    payload: json
  }));
}
