import 'babel-polyfill'; // needed to for async/await

import { GraphQLSchema } from 'graphql';
import QueryType from './types/query';
// import MutationType from './types/mutation';

export default new GraphQLSchema({
  query: QueryType,
  // mutation: MutationType,
});
