import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser
} from './dynamo';

import {
  UserType
} from './types';

const Queries = new GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: 'List of users',
      resolve: function(source, args) {
        return getUsers();
      }
    },
    user: {
      type: UserType,
      description: 'Get User by username',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {username}) {
        return getUser(username);
      }
    }
  })
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: UserType,
      description: 'Create User',
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return createUser(args);
      }
    },
    loginUser: {
      type: UserType,
      description: 'Login User',
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return loginUser(args);
      }
    },
    updateUser: {
      type: UserType,
      description: 'Update User',
      args: {
        jwt: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return updateUser(args);
      }
    },
    deleteUser: {
      type: UserType,
      description: 'Delete User',
      args: {
        jwt: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return deleteUser(args);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

export default Schema;
