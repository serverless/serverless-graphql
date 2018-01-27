import gql from 'graphql-tag';

export const NewTweetsSubscription = gql`
  subscription NewTweetsSubscription($handle: String!) {
    subscribeToTweeterUser(handle: $handle) {
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
  NewTweetsSubscription,
};
