import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Container } from './helpers';
import { DeleteTweetMutation } from '../mutations';
import { UserTweetsQuery } from '../queries';
import { AddTweetSubscription } from '../subscriptions';

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

const variables = {
  consumer_key: process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_SECRET_KEY,
};

export class UserTweetsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTweet = this.deleteTweet.bind(this);
  }

  componentDidMount() {
    this.subscription = this.props.subscribeToNewTweets(variables);
  }

  componentWillUnmount() {
    this.subscription(); // NOTE removes the subscription
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
  subscribeToNewTweets: PropTypes.func.isRequired,
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

const deleteMutation = graphql(DeleteTweetMutation, {
  props: ({ mutate }) => ({
    deleteTweet: tweetId =>
      mutate({
        variables: {
          tweet_id: tweetId,
        },
        optimisticResponse: () => ({
          deleteTweet: {
            tweet_id: tweetId,
            __typename: 'Tweet',
          },
        }),
      }),
  }),
});

export default compose(tweetsQuery, deleteMutation)(UserTweetsComponent);
