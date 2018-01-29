import React from 'react';
import PropTypes from 'prop-types';
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

const User = ({ handle }) => (
  <Main>
    <SideBar>
      <UserInfo handle={handle} />
    </SideBar>
    <Content>
      <Div>
        <TweetForm />
        <UserTweets handle={handle} />
      </Div>
    </Content>
  </Main>
);

User.propTypes = {
  handle: PropTypes.string.isRequired,
};

export default User;
