import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router';

class UsersIndex extends Component {
  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div className="row">
        <div className="twelve columns">
          <h1>Users</h1>
          <hr />
          {users.length ? (
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Link to={ 'users/' + user.username + '/show' }>{user.username}</Link>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><Link to={ 'users/' + user.username + '/edit' }>Edit</Link></td>
                  </tr>
                )}
              )}
              </tbody>
            </table>
          ) : <div>There are currently no users available to display<hr /></div> }
          <Link to={ 'users/new' } className="button button-primary">Add</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.all };
}

export default connect(mapStateToProps, { getUsers })(UsersIndex);
