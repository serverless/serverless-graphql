import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import User from './User';

const UserList = ({ data: { loading, error, getUserTwitterFeed } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <User key={getUserTwitterFeed.name} user={getUserTwitterFeed} />
    </div>
  );
};

UserList.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line
};

export const UserQuery = gql`
  query UserQuery(
    $handle: String!
    $consumer_key: String!
    $consumer_secret: String!
  ) {
    getUserTwitterFeed(
      handle: $handle
      consumer_key: $consumer_key
      consumer_secret: $consumer_secret
    ) {
      name
      location
      handle
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
      tweets(limit: 5) {
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

export default graphql(UserQuery, {
  options: () => ({
    variables: {
      handle: process.env.REACT_APP_HANDLE,
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
  }),
})(UserList);
