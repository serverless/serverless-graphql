import React from 'react';
import styled from 'styled-components';
import { Container, Main, SideBar, Content } from '../components/helpers';
import SearchTweets from '../components/SearchTweets';

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

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'ipsum',
    };

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <Main>
          <SideBar>
            <Container>
              <Form>
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.updateValue}
                  placeholder="Search for a Tweet …"
                />
              </Form>
            </Container>
          </SideBar>
          <Content>
            <SearchTweets keyword={this.state.value} />
          </Content>
        </Main>
      </div>
    );
  }
}
