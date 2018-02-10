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
    //subscribe to users tweet when I am on his page, and then unsubscribe from the tweets once I leave his page.
    this.subscription = this.props.subscribeToNewTweets(variables);
  }

  componentWillUnmount() {
    this.subscription(); // NOTE removes the subscription
  }

  render() {
    const { data } = this.props;
    const { loading, error, getUserInfo, networkStatus } = data;
    const isRefetching = networkStatus === 4; //what is this

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
    // you provide function to options property of graphql config object
    variables: { ...variables, handle: props.handle },
    fetchPolicy: 'cache-and-network',
  }),
  props: props => ({
    //props is always coming from parent component
    ...props, // expand and create (spead operator)
    subscribeToNewTweets: (
      params //subscribeToNewTweets is a function?
    ) =>
      props.data.subscribeToMore({
        //where is subscribeToMore coming from - APOLLO API
        document: AddTweetSubscription, //what is document?
        variables: params,
        updateQuery: (prev, { subscriptionData: { data: { addTweet } } }) => {
          //what is prev? - prev state of the data
          // NOTE happens when the user created the tweet and it was rendered optimistically
          const tweetAlreadyExists = prev.getUserInfo.tweets.items.find(
            item => item.tweet_id === addTweet.tweet_id
          );
          if (tweetAlreadyExists) {
            return { ...prev };
          }
          return {
            //reconstruct the entire state and add 1 tweet in the begginning of the tweet!
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
