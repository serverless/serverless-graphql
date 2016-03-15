import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser, deleteUser } from '../../actions/index';
import { Link } from 'react-router';

class UsersEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchUser(this.props.params.id);
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
      return <div>Loading...</div>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Name" ref="name" defaultValue={user.name}/>
          <input type="email" placeholder="E-Mail" ref="email" defaultValue={user.email} />
          <input type="password" placeholder="Password" ref="password" defaultValue={user.password} />
          <input type="submit" />
        </form>
        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <Link to="/">Cancel</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user };
}

export default connect(mapStateToProps, { fetchUser, updateUser, deleteUser })(UsersEdit);
