'use strict'; // eslint-disable-line strict,lines-around-directive

import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';
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

  const handler = server.graphqlLambda((graphqlEvent, graphqlContext) => {
    if (event.headers && event.headers.authorization) {
      const token = event.headers.authorization;
      try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
        graphqlContext.userId = userId; // eslint-disable-line
      } catch (err) {
        // Do nothing
      }
    }
    return {
      schema: myGraphQLSchema,
      context: graphqlContext,
    };
  });
  return handler(event, context, callbackFilter);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.graphiqlHandler = server.graphiqlLambda({
  endpointURL: process.env.GRAPHQL_ENDPOINT
    ? process.env.GRAPHQL_ENDPOINT
    : '/production/graphql',
});
