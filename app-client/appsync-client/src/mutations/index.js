import gql from 'graphql-tag';

export const AddTweetMutation = gql`
  mutation AddTweetMutation(
    $tweet: String!
    $created_at: String!
    $consumer_key: String!
    $consumer_secret: String!
  ) {
    createTweet(
      tweet: $tweet
      created_at: $created_at
      consumer_key: $consumer_key
      consumer_secret: $consumer_secret
    ) {
      tweet_id
      tweet
      retweeted
      retweet_count
      favorited
    }
  }
`;

export const UpdateTweetMutation = gql`
  mutation UpdateTweetMutation($tweet_id: String!, $tweet: String!) {
    updateTweet(tweet_id: $tweet_id, tweet: $tweet) {
      tweet_id
      tweet
    }
  }
`;

export const DeleteTweetMutation = gql`
  mutation DeleteTweetMutation($tweet_id: String!) {
    deleteTweet(tweet_id: $tweet_id) {
      tweet_id
    }
  }
`;

export const ReTweetMutation = gql`
  mutation ReTweetMutation($tweet_id: String!) {
    reTweet(tweet_id: $tweet_id) {
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
