
const schema = `
type Contributor {   
  name: String!
  location: String!
}

#returns list of contributors
type Query {
  getContributorFeed : [Contributor]
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
