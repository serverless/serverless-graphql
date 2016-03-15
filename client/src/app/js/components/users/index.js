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
        <tr key={user.id}>
          <td>
            <Link to={ 'users/' + user.id + '/show' }>{user.id}</Link>
          </td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><Link to={ 'users/' + user.id + '/edit' }>Edit</Link></td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns">
          <h1>Users</h1>
          <hr />
          {this.props.users.length ? (
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderUsers()}
              </tbody>
            </table>
          ) : <div>There are currently no users available to display</div> }
          <hr />
          <Link to={ 'users/new' } className="button button-primary">Add</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.all };
}

export default connect(mapStateToProps, { fetchUsers })(UsersIndex);
