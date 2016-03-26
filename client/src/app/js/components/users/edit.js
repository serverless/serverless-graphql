import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser, deleteUser } from '../../actions/users';
import { Link } from 'react-router';

class UsersEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.getUser(this.props.params.id);
  }

  onDeleteClick() {
    if (confirm('Do you want to delete this user?')) {
      this.props.deleteUser(this.props.params.id)
        .then(() => {
          this.context.router.push('/');
        });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    if (name.length !== 0 && email.length !== 0 && password.length !== 0) {
      let user = {
        id: this.props.params.id,
        name: name,
        email: email,
        password: password
      };

      this.props.updateUser(user)
        .then(() => {
          this.context.router.push('/');
        });
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <div className="row"><div className="twelve columns">Loading...</div></div>
    }

    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <h1>Edit user</h1>
          <hr />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Name" className="u-full-width" ref="name" defaultValue={user.name}/>
            <input type="email" placeholder="E-Mail" className="u-full-width" ref="email" defaultValue={user.email} />
            <input type="password" placeholder="Password" className="u-full-width" ref="password" defaultValue={user.password} />
            <input type="submit" className="button button-primary" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
          <hr />
          <button onClick={this.onDeleteClick.bind(this)} className="button u-full-width">Delete</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user };
}

export default connect(mapStateToProps, { getUser, updateUser, deleteUser })(UsersEdit);
