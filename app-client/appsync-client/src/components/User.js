import React from 'react';
import styled from 'styled-components';

import UserInfo from './UserInfo';
import UserTweets from './UserTweets';
import TweetForm from './TweetForm';
import { Div } from './helpers';

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

const User = () => (
  <Main>
    <SideBar>
      <UserInfo />
    </SideBar>
    <Content>
      <Div>
        <TweetForm />
        <UserTweets />
      </Div>
    </Content>
  </Main>
);

export default User;
