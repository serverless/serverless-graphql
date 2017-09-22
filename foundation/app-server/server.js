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

console.log(process.env.CLIENT_URL);

const client = process.env.CLIENT_URL;
graphQLServer.use('*', cors({ origin: client }));

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(PORT, () =>
    console.log(`GraphQL Server is now running on http://localhost:${PORT}`),
);
