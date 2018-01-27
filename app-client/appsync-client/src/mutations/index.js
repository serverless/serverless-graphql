import gql from 'graphql-tag';

export const AddTweetMutation = gql`
  mutation AddTweetMutation(
    $handle: String!
    $tweet: String!
    $consumer_key: String!
    $consumer_secret: String!
  ) {
    createTweet(
      handle: $handle
      tweet: $tweet
      consumer_key: $consumer_key
      consumer_secret: $consumer_secret
    ) {
      tweet_id
      tweet
    }
  }
`;

export const UpdateTweetMutation = gql`
  mutation UpdateTweetMutation(
    $handle: String!
    $tweet_id: String!
    $tweet: String!
  ) {
    updateTweet(handle: $handle, tweet_id: $tweet_id, tweet: $tweet) {
      tweet_id
      tweet
    }
  }
`;

export const DeleteTweetMutation = gql`
  mutation DeleteTweetMutation($handle: String!, $tweet_id: String!) {
    deleteTweet(handle: $handle, tweet_id: $tweet_id) {
      tweet_id
    }
  }
`;

export const ReTweetMutation = gql`
  mutation ReTweetMutation($handle: String!, $tweet_id: String!) {
    reTweet(handle: $handle, tweet_id: $tweet_id) {
      tweet_id
    }
  }
`;

export default {
  AddTweetMutation,
  UpdateTweetMutation,
  DeleteTweetMutation,
  ReTweetMutation,
};
