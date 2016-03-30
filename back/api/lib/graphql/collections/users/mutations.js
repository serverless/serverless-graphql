import {GraphQLString, GraphQLNonNull} from 'graphql';

import UserType from './type';
import {create, update, remove, login} from './source';

export default {
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
      return create(args);
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
      return login(args);
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
      return update(args);
    }
  },
  deleteUser: {
    type: UserType,
    description: 'Delete User',
    args: {
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function(source, args) {
      return remove(args);
    }
  }
}