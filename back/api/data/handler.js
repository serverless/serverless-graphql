'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context) {

  lib.query(event.query, function(error, response) {
    return context.done(error, response);
  });

};
