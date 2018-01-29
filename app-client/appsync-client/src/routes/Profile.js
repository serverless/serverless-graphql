import React from 'react';
import PropTypes from 'prop-types';
import { Main, SideBar, Content, Div } from '../components/helpers';
import UserInfo from '../components/UserInfo';
import UserTweets from '../components/UserTweets';

const Profile = props => (
  <div className="App">
    <Main>
      <SideBar>
        <UserInfo handle={props.match.params.handle} />
      </SideBar>
      <Content>
        <Div>
          <UserTweets handle={props.match.params.handle} />
        </Div>
      </Content>
    </Main>
  </div>
);

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
