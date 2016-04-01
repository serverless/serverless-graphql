import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import UserType from './type';
import validate from './validate.js';
import {get, getAll} from './source';

export default {
  users: {
    type: new GraphQLList(UserType),
    description: 'List of users',
    resolve: function(source, args) {
      return getAll();
    }
  },
  user: {
    type: UserType,
    description: 'Get a User by username',
    args: {
      username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: function(source, args) {
      return validate(args).then(() => get(args.username));
    }
  }
}