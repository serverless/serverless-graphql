import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    username: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    token: {type: GraphQLString}
  })
});
