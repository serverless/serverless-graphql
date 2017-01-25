'use strict'; // eslint-disable-line strict

const handle = require('./graphql/index').default; // eslint-disable-line import/no-unresolved

module.exports.graphql = (event, context, callback) => {
  handle(event.body.query, event.body.variables)
    .then((response) => callback(null, response))
    .catch((error) => callback(error));
};
