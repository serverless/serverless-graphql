'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context) {

  lib.runAdminGraphQL(event, function(error, response) {
     return context.done(error, response);
  });

};
