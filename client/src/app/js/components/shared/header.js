import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/users';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();

    let username = this.refs.username.value;
    let password = this.refs.password.value;

    if (username.length !== 0 && password.length !== 0) {
      let user = {
        username: username,
        password: password
      };

      this.props.loginUser(user);
    } else {
      alert('Please fill out all fields');
    }
  }

  handleLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    let { loggedInUsername } = this.props;

    if (loggedInUsername && loggedInUsername.length) {
      return (
        <div className="row">
          <div className="twelve columns">
            <div className="u-pull-right">
              Logged in as {loggedInUsername} <a href="#" onClick={this.handleLogoutClick}>Logout</a>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleLogin.bind(this)}>
            <div className="four columns">
              <input type="text" className="u-full-width" placeholder="Username" ref="username" />
            </div>
            <div className="four columns">
              <input type="password" className="u-full-width" placeholder="Password" ref="password"/>
            </div>
            <div className="four columns">
              <input type="submit" className="u-full-width button-primary" value="Login"/>
            </div>
          </form>
          <hr />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { loggedInUsername: state.users.loggedInUsername };
}

export default connect(mapStateToProps, { loginUser, logoutUser })(Header);
