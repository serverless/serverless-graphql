const schema = `
type Contributor {   
  name: String!
  location: String!
}

type User {
  id: String!
  name: String!
}

type AuthPayload {
  token: String!
}

#returns list of contributors
type Query {
  user: User
  getContributorFeed : [Contributor]
}

type Mutation {
  authenticate: AuthPayload!
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
