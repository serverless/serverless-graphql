'use strict'; // eslint-disable-line strict

import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
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
    console.log("yay hey");
    console.log(headers);
    console.log(functionName);
    console.log(event);
    console.log("yay bye");

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
