import React from 'react';

export default class Tweetbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'this is my first tweet' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" size="50" placeholder={this.state.value} />
          </div>
          <div>
            <input type="submit" value="Tweet" />
          </div>
        </form>
      </div>
    );
  }
}
