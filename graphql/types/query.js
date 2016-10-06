import {
  GraphQLObjectType,
} from 'graphql';
import UserType from './user';
import { nodeField } from '../node';
import db from '../database';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: UserType,
      resolve: (_, _args, context) => db.getViewer({}, context),
    },
  }),
});

export default QueryType;
