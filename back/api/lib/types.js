import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    hash: {type: GraphQLString}
  })
});
