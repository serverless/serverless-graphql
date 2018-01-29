import React from 'react';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Div, Container } from './helpers';
import { UserQuery } from '../queries';

const UserProfile = styled.div`
  margin-bottom: 15px;
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

const Numbers = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
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
  data: { loading, error, getUserInfo },
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

  return (
    <Div>
      <Container>
        <UserProfile>
          <h4 className="username">
            {getUserInfo.name}
            <div>
              <span>@{getUserInfo.handle}</span>
            </div>
          </h4>
          <p className="location">
            <i className="material-icons">location_on</i>
            {getUserInfo.location}
          </p>
          <p className="description">{getUserInfo.description}</p>
        </UserProfile>
      </Container>

      <Container>
        <Numbers>
          <div className="column">
            <div className="title">Following</div>
            <div className="number">{getUserInfo.following.length}</div>
          </div>
        </Numbers>
      </Container>

      <Container>
        <Following>
          {getUserInfo.following.map(handle => (
            <div className="username" key={handle}>
              <Link to={`/${handle}`}>{handle}</Link>
            </div>
          ))}
        </Following>
      </Container>
    </Div>
  );
};

UserInfoComponent.propTypes = {
  data: propType(UserQuery).isRequired,
};

export default graphql(UserQuery, {
  options: props => ({
    variables: {
      handle: props.handle,
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
  }),
})(UserInfoComponent);
