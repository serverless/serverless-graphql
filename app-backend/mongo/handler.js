import 'babel-polyfill';
import moment from 'moment';
//import { lambdaPlayground } from 'graphql-playground-middleware';
import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// Types
import { userType } from './data/types/user';

// Resolvers
import { userResolver } from './data/resolvers/user';

const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
const mongoString = process.env.MONGODB_URL;

const types = mergeTypes([userType]);
const solvers = mergeResolvers([userResolver]);

const myGraphQLSchema = makeExecutableSchema({
    typeDefs: types,
    resolvers: solvers,
    logger: console,
});

const server = require('apollo-server-lambda');

exports.graphqlHandler = function graphqlHandler(event, context, callback) {

    context.callbackWaitsForEmptyEventLoop = false;

    function callbackFilter(error, output) {

        if (!output.headers) {
          output.headers = {};
        }
        // eslint-disable-next-line no-param-reassign
        output.headers['Access-Control-Allow-Origin'] = '*';
        output.headers['Access-Control-Allow-Credentials'] = true;
        output.headers['Content-Type'] = 'application/json';

        callback(error, output);
    }

    mongoose.connect(mongoString, {useMongoClient: true});

    const db = mongoose.connection;
    const handler = server.graphqlLambda({ schema: myGraphQLSchema });

    db.on("error", (err) => {
        console.log("MongoDB connection error. Please make sure MongoDb is running.", err);
        process.exit();
    });

    db.once('open', () => {
       return handler(event, context, callbackFilter);
    })
};

exports.apiHandler = lambdaPlayground({
    endpoint: process.env.BACKEND_GRAPHQL_ENDPOINT_URL
                 ? process.env.BACKEND_GRAPHQL_ENDPOINT_URL
                 : '/production/graphql'
});
