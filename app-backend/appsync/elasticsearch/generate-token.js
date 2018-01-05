// eslint-disable-line strict

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const authenticationData = {
  Username: '...', // username created in cognito pool
  Password: '...', // password created in cognito pool
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

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function(result) {
    // console.log("access token = " + result.getAccessToken().getJwtToken());
    console.log(`id token = ${result.getIdToken().getJwtToken()}`);
  },

  onFailure: function(err) {
    console.log(err);
  },

  newPasswordRequired: function(userAttributes) {
    // User was signed up by an admin and must provide new
    // password and required attributes, if any, to complete
    // authentication.

    // the api doesn't accept this field back
    delete userAttributes.email_verified;

    // Get these details and call
    cognitoUser.completeNewPasswordChallenge('...', userAttributes, this); // if user is created first time, this will be used as new password
  },
});
