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
      handle
      description
      following
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
      handle
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
      handle
      description
      following
    }
  }
`;

export const MeTweetsQuery = gql`
  query MeTweetsQuery($consumer_key: String!, $consumer_secret: String!) {
    meInfo(consumer_key: $consumer_key, consumer_secret: $consumer_secret) {
      handle
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

export const SearchTweetsQuery = gql`
  query UserQuery($keyword: String!) {
    searchAllTweetsByKeyword(keyword: $keyword) {
      items {
        tweet
        tweet_id
        retweet_count
        retweeted
        favorited
      }
    }
  }
`;
