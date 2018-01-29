import React from 'react';
import styled from 'styled-components';
import { Container } from '../components/helpers';

const Main = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

const SideBar = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Content = styled.div`
  flex: 2;
`;

const Following = styled.div`
  margin-bottom: 15px;
  padding: 15px 15px;
  text-align: center;
  & .username {
    font-size: 14px;
    color: #657786;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;

export default () => (
  <div className="App">
    <Main>
      <SideBar>
        <Container>
          <Following>TODO people I follow</Following>
        </Container>
      </SideBar>
      <Content>
        <Container>TODO My Tweets</Container>
      </Content>
    </Main>
  </div>
);
