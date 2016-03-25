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

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../dynamo';

const PrivateQueries = new GraphQLObjectType({
  name: 'PrivateSchema',
  description: "Root of the Private Schema",
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

const PrivateMutations = new GraphQLObjectType({
  name: 'PrivateMutations',
  fields: {
    createUser: {
      type: UserType,
      description: "Create User",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return createUser(args);
      }
    },
    updateUser: {
      type: UserType,
      description: "Update User",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return updateUser(args);
      }
    },
    deleteUser: {
      type: UserType,
      description: "Delete User",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        let id = args.id;
        return deleteUser(id);
      }
    }
  }
});

const PrivateSchema = new GraphQLSchema({
  query: PrivateQueries,
  mutation: PrivateMutations
});

export default PrivateSchema;
