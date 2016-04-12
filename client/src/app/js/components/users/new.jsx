import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import { Link } from 'react-router';

class UsersNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    const name = this.refs.name.value;
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (name.length !== 0 && username.length !== 0 && email.length !== 0 && password.length !== 0) {
      const user = {
        name,
        username,
        email,
        password
      };

      this.props.createUser(user);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Add user</h1>
            <hr />
            <input type="text" placeholder="Name" className="u-full-width" ref="name" />
            <input type="text" placeholder="Username" className="u-full-width" ref="username" />
            <input type="email" placeholder="E-Mail" className="u-full-width" ref="email" />
            <input type="password" placeholder="Password" className="u-full-width" ref="password" />
            <input type="submit" className="button button-primary" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { createUser })(UsersNew);
