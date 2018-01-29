import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import { Container, Tweet } from './helpers';
import { SearchTweetsQuery } from '../queries';

const variables = {
  consumer_key: process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_SECRET_KEY,
};

export const SearchTweetsComponent = props => {
  const { data } = props;
  const { loading, error, searchAllTweetsByKeyword, networkStatus } = data;
  const isRefetching = networkStatus === 4;

  if (loading && !isRefetching) {
    return (
      <Container>
        <p>Loading ...</p>
      </Container>
    );
  }

  // TODO BUG fix the schema before we can remove this temporary solution
  if (searchAllTweetsByKeyword === null) {
    return (
      <Container>
        <p>Can{"'"} find any Tweets </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error.message}</p>
      </Container>
    );
  }

  return (
    <Container>
      {searchAllTweetsByKeyword.items.map((item, index) => (
        <Tweet key={index}>{item.tweet}</Tweet>
      ))}
    </Container>
  );
};

SearchTweetsComponent.propTypes = {
  data: propType(SearchTweetsQuery).isRequired, // eslint-disable-line react/no-unused-prop-types
  keyword: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const searchTweetsQuery = graphql(SearchTweetsQuery, {
  options: props => ({
    variables: { ...variables, keyword: props.keyword },
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  }),
});

export default compose(searchTweetsQuery)(SearchTweetsComponent);
