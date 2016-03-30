import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import _ from 'lodash';

const bulk = require('bulk-require');
const collections = bulk(__dirname + '/collections', '**/+(mutations|queries).js');
const queries = {}, mutations = {};

for (var name in collections) {
  if (collections[name].mutations) _.assign(mutations, collections[name].mutations.default);
  if (collections[name].queries) _.assign(queries, collections[name].queries.default);
}

const Queries = new GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: queries
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: mutations
});

export default new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});