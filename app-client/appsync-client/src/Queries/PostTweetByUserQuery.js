import gql from 'graphql-tag';

export default gql`
  mutation AddTweetMutation($screen_name: String!, $post: String!) {
    createUserTweet(screen_name: $screen_name, posts: post) {
      name
      screen_name
      description
      location
      favourites_count
      friends_count
      followers_count
      posts {
        tweet
      }
    }
  }
`;
