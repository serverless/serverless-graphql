
const schema = `
type Contributor {   
  name: String!
  location: String!
}

#returns list of contributors
type Query {
  getContributorFeed : [Contributor]
}`;

export { schema };
