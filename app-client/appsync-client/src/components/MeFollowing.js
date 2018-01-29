import React from 'react';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { Link } from 'react-router-dom';

import { Div, Container, UserProfile, Following } from './helpers';
import { MeQuery } from '../queries';

export const UserInfoComponent = ({ data: { loading, error, meInfo } }) => {
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
            {meInfo.name}
            <div>
              <span>@{meInfo.handle}</span>
            </div>
          </h4>
          <p className="location">
            <i className="material-icons">location_on</i>
            {meInfo.location}
          </p>
          <p className="description">{meInfo.description}</p>
        </UserProfile>
      </Container>

      <Container>
        <Following>
          <div>Following</div>
          {meInfo.following.map(handle => (
            <div className="username" key={handle}>
              <Link to={`/@${handle}`}>{handle}</Link>
            </div>
          ))}
        </Following>
      </Container>
    </Div>
  );
};

UserInfoComponent.propTypes = {
  data: propType(MeQuery).isRequired,
};

export default graphql(MeQuery, {
  options: () => ({
    variables: {
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
  }),
})(UserInfoComponent);
