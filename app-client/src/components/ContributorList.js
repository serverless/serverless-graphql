import React from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Contributor from './Contributor';

const ContributorList = ({ data: { loading, error, getTwitterFeed } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  console.log(getTwitterFeed);

  return (
    <div>
      {getTwitterFeed.map(user => <Contributor key={user.name} user={user} />)}
    </div>
  );
};

ContributorList.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line
};

export const ContributorQuery = gql`
  query ContributorQuery(
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
    }
  }
`;

export default graphql(ContributorQuery, {
  options: () => ({
    variables: {
      handle: 'nikgraf',
      consumer_key: 'xxx',
      consumer_secret: 'xxx',
    },
  }),
})(ContributorList);
