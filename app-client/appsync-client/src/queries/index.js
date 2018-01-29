import gql from 'graphql-tag';

export const UserQuery = gql`
  query UserQuery(
    $handle: String!
    $consumer_key: String!
    $consumer_secret: String!
  ) {
    getUserInfo(
      handle: $handle
      consumer_key: $consumer_key
      consumer_secret: $consumer_secret
    ) {
      name
      location
      favourites_count
      description
      followers_count
      friends_count
      followers
      topTweet {
        tweet_id
        tweet
        retweeted
        retweet_count
        favorited
      }
    }
  }
`;

export const UserTweetsQuery = gql`
  query UserTweetsQuery(
    $handle: String!
    $consumer_key: String!
    $consumer_secret: String!
  ) {
    getUserInfo(
      handle: $handle
      consumer_key: $consumer_key
      consumer_secret: $consumer_secret
    ) {
      tweets(limit: 10) {
        items {
          tweet
          tweet_id
          retweet_count
          retweeted
          favorited
        }
        nextToken
      }
    }
  }
`;

export const MeQuery = gql`
  query MeQuery($consumer_key: String!, $consumer_secret: String!) {
    meInfo(consumer_key: $consumer_key, consumer_secret: $consumer_secret) {
      name
      location
      favourites_count
      description
      followers_count
      friends_count
      followers
      topTweet {
        tweet_id
        tweet
        retweeted
        retweet_count
        favorited
      }
    }
  }
`;

export const MeTweetsQuery = gql`
  query MeTweetsQuery($consumer_key: String!, $consumer_secret: String!) {
    meInfo(consumer_key: $consumer_key, consumer_secret: $consumer_secret) {
      tweets(limit: 10) {
        items {
          tweet
          tweet_id
          retweet_count
          retweeted
          favorited
        }
        nextToken
      }
    }
  }
`;
