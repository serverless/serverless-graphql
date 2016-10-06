/* @flow */

import type { Location } from '../types/reactRouter';

export function setRedirectLocation(location: Location) {
  localStorage.setItem('redirect_location', JSON.stringify(location));
}

export function getRedirectLocation(): string | Location {
  const redirectLocationString = localStorage.getItem('redirect_location');

  if (!redirectLocationString) {
    return '/';
  }

  const redirectLocation = JSON.parse(redirectLocationString);
  localStorage.removeItem('redirect_location');
  return redirectLocation;
}
