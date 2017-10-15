/**
 * Created by sid.gupta on 10/10/17.
 */

'use strict'; // eslint-disable-line strict

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const authenticationData = {
  Username: '...', // username created in cognito pool
  Password: '...', //password created in cognito pool
};

const poolData = {
  UserPoolId: '...', // Your user pool id here
  ClientId: '...', // Your client id here
};

const userPool = new CognitoUserPool(poolData);

const userData = {
  Username: '...', // username created in cognito pool
  Pool: userPool,
};

const authenticationDetails = new AuthenticationDetails(authenticationData);
const cognitoUser = new CognitoUser(userData);

export const getToken = new Promise((resolve, reject) => {
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess(result) {
      //console.log(`access token = ${result.getAccessToken().getJwtToken()}`);
      //console.log(`id token = ${result.getIdToken().getJwtToken()}`);
      resolve(result.getIdToken().getJwtToken());
    },

    onFailure(err) {
      //console.log(err);
      reject(null);
    },
  });
});
