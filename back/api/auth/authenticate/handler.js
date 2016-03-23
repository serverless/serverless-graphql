'use strict';

var jwt    = require('jsonwebtoken');
var crypto = require('crypto');

module.exports.handler = function(event, context) {

  if (!event.username) context.fail('username is required');
  if (!event.password) context.fail('password is required');

  var user = {}; // lookup username/password_hash via GraphQL

  if (!user) context.fail('user not found');

  var hash = crypto
    .createHmac("md5", process.env.AUTH_TOKEN_SECRET)
    .update(event.password)
    .digest('hex');

  if (hash != user.hash) context.fail('invalid password');

  var token = jwt.sign(user, process.env.AUTH_TOKEN_SECRET);

  return context.done(null, {
    token: token
  });
};
