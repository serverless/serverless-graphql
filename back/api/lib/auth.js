'use strict';

const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

function authorize(token, requiredPermissions) {

  // make sure user is logged in
  try {
    var user = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
  } catch(e) {
    return Promise.reject('Invalid Token');
  }

  // make sure user have the required permissions
  requiredPermissions.forEach((p) => {
    if (user.permissions.indexOf(p) === -1) return Promise.reject('User is unauthorized to take this action');
  });

  return Promise.resolve(user);
}

function authenticate(user) {
  return jwt.sign(user, process.env.AUTH_TOKEN_SECRET);
}

module.exports = {authenticate, authorize};