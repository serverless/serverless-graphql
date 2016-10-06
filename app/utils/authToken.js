/* @flow */

import decode from 'jwt-decode';

const TOKEN_KEY = 'id_token';

function getTokenExpirationDate(token: string) {
  const decoded = decode(token);
  if (!decoded.exp) {
    return null;
  }

  // The 0 here is the key, which sets the date to the epoch
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

function isTokenExpired(token: string) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
}

export function setAuthToken(authToken: string) {
  localStorage.setItem(TOKEN_KEY, authToken);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  const token = getAuthToken();
  return !!token && !isTokenExpired(token);
}
