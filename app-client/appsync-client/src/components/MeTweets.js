import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import { Container, ProfileIcon, Tweet } from './helpers';
import { DeleteTweetMutation } from '../mutations';
import { MeTweetsQuery } from '../queries';
import { AddTweetSubscription } from '../subscriptions';

const variables = {
  consumer_key: process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_SECRET_KEY,
};

export class MeTweetsComponent extends React.Component {
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
    const { loading, error, meInfo, networkStatus } = data;
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
        {meInfo.tweets.items.map((item, index) => (
          <Tweet key={index}>
            <button onClick={() => this.deleteTweet(item)}>Delete</button>
            <ProfileIcon>{meInfo.handle[0]}</ProfileIcon>
            {item.tweet}
          </Tweet>
        ))}
      </Container>
    );
  }
}

MeTweetsComponent.propTypes = {
  data: propType(MeTweetsQuery).isRequired,
  deleteTweet: PropTypes.func.isRequired,
  subscribeToNewTweets: PropTypes.func.isRequired,
};

const tweetsQuery = graphql(MeTweetsQuery, {
  options: () => ({
    variables,
    fetchPolicy: 'cache-and-network',
  }),
  props: props => ({
    ...props,
    subscribeToNewTweets: params =>
      props.data.subscribeToMore({
        document: AddTweetSubscription,
        variables: params,
        // TODO BUG: need to filter tweets based on more fine grained / unique value if possible
        updateQuery: (
          prev,
          {
            subscriptionData: {
              data: { addTweet },
            },
          }
        ) => {
          const tweetAlreadyExists = prev.meInfo.tweets.items.find(
            item => item.tweet === addTweet.tweet
          );
          if (tweetAlreadyExists) {
            return { ...prev };
          }
          return {
            ...prev,
            meInfo: {
              ...prev.meInfo,
              tweets: {
                items: [addTweet, ...prev.meInfo.tweets.items],
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

export default compose(
  tweetsQuery,
  deleteMutation
)(MeTweetsComponent);
