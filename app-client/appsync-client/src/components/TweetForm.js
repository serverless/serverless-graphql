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
    event.preventDefault(); //prevent from going to next page. (don't do anything)
    const { value, sending } = this.state;

    if (!value.trim() || sending) {
      //empty string or just clicked sending so that people can't send 2 tweets at he the same time
      return;
    }

    this.setState({
      sending: true,
      error: null,
    });

    this.props //props are derived from the component
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
            onChange={this.updateValue} //keep saving text state
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
      const createdAt = new Date().toISOString();
      return mutate({
        //mutate is an API to send GraphQL mutation, if you invoke it, you do the request.
        variables: {
          consumer_key: process.env.REACT_APP_CONSUMER_KEY,
          consumer_secret: process.env.REACT_APP_SECRET_KEY,
          tweet,
          created_at: createdAt,
        },
        optimisticResponse: () => ({
          createTweet: {
            tweet,
            tweet_id: uuid(),
            created_at: createdAt,
            retweeted: false,
            retweet_count: 0,
            favorited: false,
            __typename: 'Tweet',
          },
        }),
        refetchQueries: [
          //when i add a tweet, something might change in the backend so fetch tweets again
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
