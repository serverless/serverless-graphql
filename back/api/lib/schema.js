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

import { getUsers, getUser, createUser, loginUser, updateUser, deleteUser } from './dynamo';

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    hash: {type: GraphQLString}
  })
});

const Queries = new GraphQLObjectType({
  name: 'Schema Root',
  description: "Root of the Schema",
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


const Mutations = new GraphQLObjectType({
  name: 'Mutations',
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
    loginUser: {
      type: UserType,
      description: "Login User",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, args) {
        return loginUser(args);
      }
    },
    updateUser: { // authenticated
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
    }
  }
});

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

export default Schema;
