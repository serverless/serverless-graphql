import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/index';
import { Link } from 'react-router';

class UsersShow extends Component {
  componentWillMount() {
    this.props.getUser(this.props.params.id);
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <div className="row"><div className="twelve columns">Loading...</div></div>
    }

    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <h1>{user.name}</h1>
          <hr />
          <p>{user.id}</p>
          <p>{user.email}</p>
          <hr />
          <Link to='/' className="button u-full-width">Back</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user };
}

export default connect(mapStateToProps, { getUser })(UsersShow);
