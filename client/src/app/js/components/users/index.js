import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/index';
import { Link } from 'react-router';

class UsersIndex extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return (
        <li key={user.id}>
          <Link to={ 'users/' + user.id }>
            <span>{user.email}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderUsers()}
        </ul>
        <Link to={ 'user/new' }>
          <span>Add</span>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.all };
}

export default connect(mapStateToProps, { fetchUsers })(UsersIndex);
