'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context) {
  return context.done(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
