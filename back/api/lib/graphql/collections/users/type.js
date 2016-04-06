'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    username: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    token: {type: GraphQLString}
  })
});
