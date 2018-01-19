import React from 'react';
import { graphql } from 'react-apollo';

import PostTweetByUserQuery from '../Queries/PostTweetByUserQuery';

export class Tweetbar extends React.Component {
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

    debugger;
    this.props
      .mutate({
        variables: {
          screen_name: process.env.REACT_APP_HANDLE,
          post: value,
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              size="50"
              value={this.state.value}
              onChange={this.updateValue}
              placeholder="Submit a tweet!"
            />
          </div>
          <div>
            <input type="submit" value="Send Tweet" />
          </div>
        </form>
      </div>
    );
  }
}

export default graphql(PostTweetByUserQuery)(Tweetbar);
