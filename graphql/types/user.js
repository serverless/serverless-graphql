/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import { nodeInterface } from '../node';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'The name of the user',
    },
  }),
  interfaces: [nodeInterface],
});

export default UserType;
