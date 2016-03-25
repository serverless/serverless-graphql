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

export default UserType;
