import gql from 'graphql-tag';

export default gql`
  query UserQuery(
    $handle: String!
    $consumer_key: String!
    $consumer_secret: String!
  ) {
    getTwitterFeed(
      handle: $handle
      consumer_key: $consumer_key
      consumer_secret: $consumer_secret
    ) {
      name
      location
      screen_name
      favourites_count
      description
      followers_count
      friends_count
      posts {
        tweet
      }
    }
  }
`;
