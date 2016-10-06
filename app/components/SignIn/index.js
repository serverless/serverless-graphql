/* @flow */

import React from 'react';
import lifecycle from 'recompose/lifecycle';

const SignIn = () => <div />;

const enhance = lifecycle({
  componentDidMount() {
    this.props.route.auth0Lock.show({ initialScreen: 'login' });
  },
  componentWillUnmount() {
    this.props.route.auth0Lock.hide();
  },
});

export default enhance(SignIn);
