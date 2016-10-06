/* @flow */

function generateXsrfToken() {
  return Math.random().toString(36).slice(2);
}

function setXsrfToken() {
  const newXsrfToken = generateXsrfToken();
  localStorage.setItem('xsrf_token', newXsrfToken);
}

export function getXsrfToken(): ?string {
  return localStorage.getItem('xsrf_token');
}

export function initializeXsrfToken() {
  if (!getXsrfToken()) {
    setXsrfToken();
  }
}
