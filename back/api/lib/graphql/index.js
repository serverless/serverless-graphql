'use strict';

const graphql = require('graphql').graphql;
const Schema = require('./schema');

module.exports = (eventQuery) => {

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  let query, variables;

  if (eventQuery && eventQuery.hasOwnProperty('query')) {
    query = eventQuery.query.replace("\n", ' ', "g");
  }

  if (eventQuery && eventQuery.hasOwnProperty('variables')) {
    variables = JSON.parse(eventQuery.variables);
  }

  return graphql(Schema, query, null, variables);
};
