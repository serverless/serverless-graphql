'use strict';

const GraphQL = require('graphql')
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLSchema = GraphQL.GraphQLSchema;
const _ = require('lodash');
const queries = {}, mutations = {};

// add your collections here
const collections = [
  'users'
];

// load collections queries and muataions
collections.forEach(name => {
  _.assign(queries, require(`./collections/${name}/queries`));
  _.assign(mutations, require(`./collections/${name}/mutations`));
});

const Queries = new GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: queries
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: mutations
});

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
