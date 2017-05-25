/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The unique Identifier of the user',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user',
    },
  }),
});

export default UserType;
