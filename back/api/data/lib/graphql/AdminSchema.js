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

import { getUsers, getUser, createUser, updateUser } from '../dynamo';

const AdminQueries = new GraphQLObjectType({
  name: 'AdminSchema',
  description: "Root of the Admin Schema",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of posts in the blog",
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

const AdminMutuations = new GraphQLObjectType({
  name: 'AdminMutations',
  fields: {
    createUser: {
      type: User,
      description: "Create User",
      args: {
        name: {type: new GraphQLLimitedString(10, 30)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, args) {
        return createUser(args);
      }
    },
    updateUser: {
      type: User,
      description: "Update User",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: function(source, args) {
        return updateUser(args);
      }
    }
  }
});

const AdminSchema = new GraphQLSchema({
  query: AdminQueries,
  mutation: AdminMutuations
});

export default AdminSchema;
