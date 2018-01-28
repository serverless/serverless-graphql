import gql from 'graphql-tag';

export const AddTweetSubscription = gql`
  subscription AddTweetSubscription {
    addTweet {
      __typename
      tweet_id
      tweet
      retweeted
      retweet_count
      favorited
    }
  }
`;

export default {
  AddTweetSubscription,
};
