import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import {
    graphqlExpress,
    graphiqlExpress,
} from 'apollo-server-express';

import { schema } from './schema';
import { resolvers } from './resolvers';

const PORT = 4000;
const graphQLServer = express();

graphQLServer.use('*', cors({ origin: 'http://localhost:3000' }));

const myGraphQLSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers,
    logger: console,
});

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({schema:myGraphQLSchema}));
graphQLServer.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

graphQLServer.listen(PORT, () =>
    console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);