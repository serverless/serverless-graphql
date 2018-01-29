import React from 'react';
import { Container, Main, SideBar, Content } from '../components/helpers';
import MeTweets from '../components/MeTweets';
import MeFollowing from '../components/MeFollowing';
import TweetForm from '../components/TweetForm';

export default () => (
  <div className="App">
    <Main>
      <SideBar>
        <Container>
          <MeFollowing />
        </Container>
        <Container>TODO add search</Container>
      </SideBar>
      <Content>
        <TweetForm />
        <MeTweets />
      </Content>
    </Main>
  </div>
);
