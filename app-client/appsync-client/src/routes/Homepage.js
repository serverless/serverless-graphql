import React from 'react';
import { Main, SideBar, Content } from '../components/helpers';
import MeTweets from '../components/MeTweets';
import MeFollowing from '../components/MeFollowing';
import TweetForm from '../components/TweetForm';

export default () => (
  <div className="App">
    <Main>
      <SideBar>
        <MeFollowing />
      </SideBar>
      <Content>
        <TweetForm />
        <MeTweets />
      </Content>
    </Main>
  </div>
);
