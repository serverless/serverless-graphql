import React from 'react';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { Link } from 'react-router-dom';

import { Div, Container, UserProfile, Following } from './helpers';
import { MeQuery } from '../queries';

//react component 1) can return JSX or 2) can extend other components
export const UserInfoComponent = props => {
  //react compnent -> function that returns JSX, input: destructured params
  const { data } = props;
  const { loading, error, meInfo } = data;
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
          {meInfo.following.map((
            handle //this is the list of following a user have on his profile
          ) => (
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
  data: propType(MeQuery).isRequired, //dynamic type checking at runtime
};

export default graphql(MeQuery, {
  //graphql is a function that creates a higher order component with a certain configuration and UserInfoComponent is component
  options: () => ({
    variables: {
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_SECRET_KEY,
    },
  }),
})(UserInfoComponent);
//graphql is like a black box because it abstracts data loading (renders the tree and fetch everuythin)
//apollo HOC is injecting props using graphql function
