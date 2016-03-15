import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/index';
import { Link } from 'react-router';

class UsersNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    if (name.length !== 0 && email.length !== 0 && password.length !== 0) {
      let user = {
        name: name,
        email: email,
        password: password
      };

      this.props.createUser(user)
        .then(() => {
          this.context.router.push('/');
        });
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Name" ref="name" />
        <input type="email" placeholder="E-Mail" ref="email" />
        <input type="password" placeholder="Password" ref="password" />
        <input type="submit" />

        <Link to="/">Cancel</Link>
      </form>
    );
  }
}

export default connect(null, { createUser })(UsersNew);
