'use strict'; // eslint-disable-line strict

import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { resolvers } from './resolvers';

const server = require('apollo-server-lambda');

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackFilter(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = server.graphqlLambda({ schema: myGraphQLSchema });
  return handler(event, context, callbackFilter);
};

exports.graphiqlHandler = server.graphiqlLambda({ endpointURL: '/production/graphql' });
