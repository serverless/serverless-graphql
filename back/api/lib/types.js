import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    username: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    jwt: {type: GraphQLString}
  })
});
