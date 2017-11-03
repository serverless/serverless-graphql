'use strict'; // eslint-disable-line strict,lines-around-directive

import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { resolvers } from './resolvers';

const { graphqlLambda, graphiqlLambda } = require('apollo-server-lambda');
const { lambdaPlayground } = require('graphql-playground-middleware');

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

  const handler = graphqlLambda({ schema: myGraphQLSchema });
  return handler(event, context, callbackFilter);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.graphiqlHandler = graphiqlLambda({
  endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT
    ? process.env.REACT_APP_GRAPHQL_ENDPOINT
    : '/production/graphql',
});

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playgroundHandler = lambdaPlayground({
  endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
    ? process.env.REACT_APP_GRAPHQL_ENDPOINT
    : '/production/graphql',
});
