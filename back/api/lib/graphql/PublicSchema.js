import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  GraphQLLimitedString
} from 'graphql-custom-types';

import UserType from './UserType';

import { getUsers, getUser } from '../dynamo';

const PublicQueries = new GraphQLObjectType({
  name: 'PublicSchema',
  description: "Root of the Public Schema",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of users",
      resolve: function(source, args) {
        return getUsers();
      }
    },
    user: {
      type: UserType,
      description: "Get User by id",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {id}) {
        return getUser(id);
      }
    }
  })
});

const PublicSchema = new GraphQLSchema({
  query: PublicQueries
});

export default PublicSchema;
