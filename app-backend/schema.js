const schema = `
type Tweets {   
  tweet : String!
  name: String!
  screen_name: String!
  location: String!
  description: String!
  followers_count: Int!
  friends_count: Int!
}

#returns list of Tweets
type Query {
  getTwitterFeed(handle: String!, consumer_key: String!, consumer_secret: String!) : [Tweets]
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
