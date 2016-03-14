import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/index';
import { Link } from 'react-router';

class UsersShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchUser(this.props.params.id);
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to='/'>Back</Link>
        <p>{user.name}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user };
}

export default connect(mapStateToProps, { fetchUser })(UsersShow);
