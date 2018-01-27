import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Container } from './helpers';
import { DeleteTweetMutation } from '../mutations';
import { UserTweetsQuery } from '../queries';

const Tweet = styled.div`
  border-bottom: 1px solid #e6ecf0;
  padding: 15px 15px;
  font-size: 14px;
  line-height: 20px;

  button {
    margin-left: 5px;
    float: right;
  }
`;

export class UserTweetsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTweet = this.deleteTweet.bind(this);
  }

  deleteTweet(tweet) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      this.props.deleteTweet(tweet.tweet_id).then(() => {
        setTimeout(() => {
          this.props.data.refetch();
        }, 1000); // give the backend a second to fully remove record
      });
    }
  }

  render() {
    const { data } = this.props;
    const { loading, error, getUserTwitterFeed, refetch } = data;

    if (loading && !refetch) {
      return (
        <Container>
          <p>Loading ...</p>
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
        {getUserTwitterFeed.tweets.items.map((item, index) => (
          <Tweet key={index}>
            <button onClick={() => this.deleteTweet(item)}>Delete</button>
            {item.tweet}
          </Tweet>
        ))}
      </Container>
    );
  }
}

UserTweetsComponent.propTypes = {
  data: propType(UserTweetsQuery).isRequired,
  deleteTweet: PropTypes.func.isRequired,
};

const tweetsQuery = graphql(UserTweetsQuery, {
  options: () => ({
    variables: {
      handle: process.env.REACT_APP_HANDLE,
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
    fetchPolicy: 'cache-and-network',
  }),
});

const deleteMutation = graphql(DeleteTweetMutation, {
  props: ({ mutate }) => ({
    deleteTweet: tweetId =>
      mutate({
        variables: {
          handle: process.env.REACT_APP_HANDLE,
          tweet_id: tweetId,
        },
        optimisticResponse: () => ({
          deleteTweet: {
            handle: process.env.REACT_APP_HANDLE,
            tweet_id: tweetId,
            __typename: 'Tweet',
          },
        }),
      }),
  }),
});

export default compose(tweetsQuery, deleteMutation)(UserTweetsComponent);
