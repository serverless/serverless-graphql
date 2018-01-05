import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import User from './User';
import GetTweetsByUserQuery from '../Queries/GetTweetsByUserQuery';
import PostTweetByUserQuery from '../Queries/PostTweetByUserQuery';

const UserList = ({ data: { loading, error, getTwitterFeed } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <User key={getTwitterFeed.name} user={getTwitterFeed} />
    </div>
  );
};

UserList.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line
};

export default compose(
  graphql(GetTweetsByUserQuery, {
    options: () => ({
      variables: {
        handle: process.env.REACT_APP_HANDLE,
        consumer_key: process.env.REACT_APP_CONSUMER_KEY,
        consumer_secret: process.env.REACT_APP_SECRET_KEY,
      },
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(PostTweetByUserQuery, {
    options: {
      refetchQueries: [{ query: GetTweetsByUserQuery }],
      update: (dataProxy, { data: { createUserTweet } }) => {
        const query = GetTweetsByUserQuery;
        const data = dataProxy.readQuery({ query });

        data.posts.push(createUserTweet);

        dataProxy.writeQuery({ query, data });
      },
    },
  })
)(UserList);
