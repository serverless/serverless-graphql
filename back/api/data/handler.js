'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context) {
  lib.query(event.query)
      .then(function (response) {
        context.done(null, response);
      });
}