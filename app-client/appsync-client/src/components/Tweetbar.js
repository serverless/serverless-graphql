import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Container = styled.div`
  margin: auto;
  width: 600px;
  max-width: 100%;
  text-align: left;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.3);
`;

const bar = styled.div`
  margin-bottom: 30px;
  padding: 15px 15px;
  text-align: center;
  & .bar {
    color: #14171a;
    font-size: 16px;
    font-weight: bold;
  }
  & .material-icons {
    font-size: 16px;
  }
`;

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
      <Div>
        <form onSubmit={this.handleSubmit}>
          <Div>
            <input type="text" size="50" value={this.state.value} />
          </Div>
          <Div>
            <input type="submit" value="Tweet" />
          </Div>
        </form>
      </Div>
    );
  }
}
