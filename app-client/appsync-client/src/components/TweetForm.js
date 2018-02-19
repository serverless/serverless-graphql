import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Container } from './helpers';
import { AddTweetMutation } from '../mutations';
import { MeTweetsQuery } from '../queries';

const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  input {
    flex: auto;
    padding: 5px;
    font-size: 16px;
  }

  button {
    border: 1px solid darkgrey;
    background-color: skyblue;
    font-size: 16px;
    padding: 6px 16px;
    margin-left: 5px;

    &:hover {
      color: white;
      background-color: lightblue;
      cursor: pointer;
    }
  }
`;

export class TweetFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sending: false,
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value, sending } = this.state;

    if (!value.trim() || sending) {
      return;
    }

    this.setState({
      sending: true,
      error: null,
    });

    this.props
      .addTweet(value)
      .then(() => {
        this.setState({
          value: '',
          sending: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          sending: false,
        });
      });
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { value, error } = this.state;
    return (
      <Container>
        {error && <p>{error}</p>}
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            size="50"
            value={value}
            onChange={this.updateValue}
            placeholder="Submit a tweet!"
            maxLength="140"
          />
          <button type="submit">Send</button>
        </Form>
      </Container>
    );
  }
}

TweetFormComponent.propTypes = {
  addTweet: PropTypes.func.isRequired,
};

export default graphql(AddTweetMutation, {
  props: ({ mutate }) => ({
    addTweet: tweet => {
      return mutate({
        variables: {
          consumer_key: process.env.REACT_APP_CONSUMER_KEY,
          consumer_secret: process.env.REACT_APP_SECRET_KEY,
          tweet,
        },
        optimisticResponse: () => ({
          createTweet: {
            tweet,
            tweet_id: uuid(),
            retweeted: false,
            retweet_count: 0,
            favorited: false,
            __typename: 'Tweet',
          },
        }),
        refetchQueries: [
          {
            query: MeTweetsQuery,
            variables: {
              consumer_key: process.env.REACT_APP_CONSUMER_KEY,
              consumer_secret: process.env.REACT_APP_SECRET_KEY,
            },
          },
        ],
      });
    },
  }),
})(TweetFormComponent);
