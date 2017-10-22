import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class User extends React.Component {
  authenticate = async () => {
    const { data } = await this.props.mutate();
    localStorage.setItem('token', data.authenticate.token);
    this.props.refetch();
  };

  logout = () => {
    localStorage.removeItem('token');
    this.props.refetch();
  };

  render() {
    const { user, loading } = this.props;
    if (loading) {
      return <div>Loading ...</div>;
    }
    if (!user) {
      return (
        <div>
          You are not connected.<br />Please click on the button below to login<br />{' '}
          <button onClick={this.authenticate}>Login</button>
        </div>
      );
    }
    return (
      <div>
        <div>Connected as:</div>
        <div>{user.name}</div>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.any, // eslint-disable-line
  loading: PropTypes.bool,
  refetch: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

User.defaultProps = {
  loading: false,
  user: null,
};

const UserQuery = gql`
  query User {
    user {
      id
      name
    }
  }
`;

const AuthenticateMutation = gql`
  mutation authenticate {
    authenticate {
      token
    }
  }
`;

export default compose(
  graphql(UserQuery, { props: ({ data }) => ({ ...data }) }),
  graphql(AuthenticateMutation),
)(User);
