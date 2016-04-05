import {GraphQLString, GraphQLNonNull} from 'graphql';

import UserType from './type';
import validate from './validate';
import {authorize} from '../../../auth';
import {create, update, remove, login} from './resolves';

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
      return validate(args).then(() => create(args));
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
      return validate(args).then(() => login(args));
    }
  },
  updateUser: {
    type: UserType,
    description: 'Update User',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function(source, args) {
      return validate(args).then(() => authorize(args.token, ['UPDATE_USER'])).then((user) => update(user, args));
    }
  },
  deleteUser: {
    type: UserType,
    description: 'Delete User',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function(source, args) {
      return validate(args).then(() => authorize(args.token, ['DELETE_USER'])).then((user) => remove(user));
    }
  }
}