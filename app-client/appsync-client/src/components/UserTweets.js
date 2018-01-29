import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import { Container, ProfileIcon, Tweet } from './helpers';
import { UserTweetsQuery } from '../queries';
import { AddTweetSubscription } from '../subscriptions';

const variables = {
  consumer_key: process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_SECRET_KEY,
};

export class UserTweetsComponent extends React.Component {
  componentDidMount() {
    this.subscription = this.props.subscribeToNewTweets(variables);
  }

  componentWillUnmount() {
    this.subscription(); // NOTE removes the subscription
  }

  render() {
    const { data } = this.props;
    const { loading, error, getUserInfo, networkStatus } = data;
    const isRefetching = networkStatus === 4;

    if (loading && !isRefetching) {
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
        {getUserInfo.tweets.items.map((item, index) => (
          <Tweet key={index}>
            <ProfileIcon>{getUserInfo.handle[0]}</ProfileIcon>
            {item.tweet}
          </Tweet>
        ))}
      </Container>
    );
  }
}

UserTweetsComponent.propTypes = {
  data: propType(UserTweetsQuery).isRequired,
  subscribeToNewTweets: PropTypes.func.isRequired,
  handle: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const tweetsQuery = graphql(UserTweetsQuery, {
  options: props => ({
    variables: { ...variables, handle: props.handle },
    fetchPolicy: 'cache-and-network',
  }),
  props: props => ({
    ...props,
    subscribeToNewTweets: params =>
      props.data.subscribeToMore({
        document: AddTweetSubscription,
        variables: params,
        updateQuery: (prev, { subscriptionData: { data: { addTweet } } }) => {
          // NOTE happens when the user created the tweet and it was rendered optimistically
          const tweetAlreadyExists = prev.getUserInfo.tweets.items.find(
            item => item.tweet_id === addTweet.tweet_id
          );
          if (tweetAlreadyExists) {
            return { ...prev };
          }
          return {
            ...prev,
            getUserInfo: {
              ...prev.getUserInfo,
              tweets: {
                items: [addTweet, ...prev.getUserInfo.tweets.items],
              },
            },
          };
        },
      }),
  }),
});

export default compose(tweetsQuery)(UserTweetsComponent);
