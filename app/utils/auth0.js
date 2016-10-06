/* @flow */

import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';
import { setAuthToken } from './authToken';
import { getXsrfToken } from './xsrfToken';

if (!process.env.AUTH_CLIENT_ID) { throw new Error('AUTH_CLIENT_ID is not defined'); }
if (!process.env.AUTH_DOMAIN) { throw new Error('AUTH_DOMAIN is not defined'); }

const CLIENT_ID = process.env.AUTH_CLIENT_ID;
const DOMAIN = process.env.AUTH_DOMAIN;

export function initializeAuth0Lock() {
  return new Auth0Lock(CLIENT_ID, DOMAIN, {
    auth: {
      redirectUrl: `${window.location.origin}/sign-in-success`,
      responseType: 'token',
      params: {
        state: getXsrfToken(),
        scope: 'openid email_verified',
      },
    },
    theme: {
      logo: 'https://serverless.com/_/src/assets/images/serverless_logo.b4d75ff74698b085425ca2d987f5c155.png',
      primaryColor: '#1C1C1C',
    },
    languageDictionary: {
      title: '',
    },
    closable: false,
  });
}

export function parseAuthHash(hash: string): { authenticated: boolean, reason?: string } {
  const authResult = new Auth0({
    clientID: CLIENT_ID,
    domain: DOMAIN,
  }).parseHash(hash);

  if (!authResult.idTokenPayload.email_verified) {
    return { authenticated: false, reason: 'email-not-verified' };
  }

  if (authResult && authResult.idToken && authResult.state === getXsrfToken()) {
    setAuthToken(authResult.idToken);
    return { authenticated: true };
  }

  return { authenticated: false, reason: 'invalid-token' };
}
