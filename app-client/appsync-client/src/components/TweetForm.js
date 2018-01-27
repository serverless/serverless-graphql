import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { AddTweetMutation } from '../mutations';
import { Div, Container } from './helpers';

const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: row;

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

export class TweetForm extends React.Component {
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

    console.log(`Sending: ${value}`);

    this.setState({
      sending: true,
      error: null,
    });

    this.props
      .mutate({
        variables: {
          handle: process.env.REACT_APP_HANDLE,
          consumer_key: process.env.REACT_APP_CONSUMER_KEY,
          consumer_secret: process.env.REACT_APP_SECRET_KEY,
          tweet: value,
        },
      })
      .then(({ data }) => {
        console.log(data);
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
    return (
      <Div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              size="50"
              value={this.state.value}
              onChange={this.updateValue}
              placeholder="Submit a tweet!"
            />
            <button type="submit">Send</button>
          </Form>
        </Container>
      </Div>
    );
  }
}

export default graphql(AddTweetMutation)(TweetForm);
