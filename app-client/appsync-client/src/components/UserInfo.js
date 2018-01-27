import React from 'react';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Div, Container } from './helpers';
import { UserQuery } from '../queries';

const UserProfile = styled.div`
  margin-bottom: 30px;
  padding: 15px 15px;
  text-align: center;
  & .username {
    color: #14171a;
    font-size: 16px;
    font-weight: bold;
  }
  & .username span {
    font-size: 14px;
    color: #657786;
  }
  & .location {
    color: #657786;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .description {
    margin-top: 15px;
  }
  & .material-icons {
    font-size: 16px;
  }
`;

const Numbers = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  & .column {
    color: #657786;
    flex: 1;
    text-align: center;
    padding: 15px 0;
  }
  & .title {
    font-size: 12px;
    font-weight: bold;
  }
  & .number {
    font-size: 18px;
    font-weight: bold;
    margin-top: 3px;
  }
`;

export const UserInfoComponent = ({
  data: { loading, error, getUserTwitterFeed },
}) => {
  if (loading) {
    return (
      <Div>
        <Container>
          <p>Loading ...</p>
        </Container>
      </Div>
    );
  }
  if (error) {
    return (
      <Div>
        <Container>
          <p>{error.message}</p>
        </Container>
      </Div>
    );
  }

  const user = getUserTwitterFeed;

  return (
    <Div>
      <Container>
        <UserProfile>
          <h4 className="username">
            {user.name} <span>@{user.screen_name}</span>
          </h4>
          <p className="location">
            <i className="material-icons">location_on</i>
            {user.location}
          </p>
          <p className="description">{user.description}</p>
        </UserProfile>
      </Container>

      <Container>
        <Numbers>
          <div className="column">
            <div className="title">Tweets</div>
            <div className="number">{user.tweets.items.length}</div>
          </div>
          <div className="column">
            <div className="title">Followers</div>
            <div className="number">{user.followers_count}</div>
          </div>
          <div className="column">
            <div className="title">Likes</div>
            <div className="number">{user.favourites_count}</div>
          </div>
          <div className="column">
            <div className="title">Friends</div>
            <div className="number">{user.friends_count}</div>
          </div>
        </Numbers>
      </Container>
    </Div>
  );
};

UserInfoComponent.propTypes = {
  data: propType(UserQuery).isRequired,
};

export default graphql(UserQuery, {
  options: () => ({
    variables: {
      handle: process.env.REACT_APP_HANDLE,
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
  }),
})(UserInfoComponent);
