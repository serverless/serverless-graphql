'use strict'; // eslint-disable-line strict

import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { resolvers } from './resolvers';

const server = require("apollo-server-lambda");

const myGraphQLSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers,
    logger: console,
});

exports.graphqlHandler = server.graphqlLambda((event, context) => {
    const headers = event.headers,
    functionName = context.functionName;
    console.log(headers);
    console.log(functionName);
    console.log(event);

    return {
        schema: myGraphQLSchema,
        context: {
            headers,
            functionName,
            event,
            context
        }

    };
});

// exports.graphiqlHandler = server.graphiqlLambda({ endpointURL: '/graphql' });
