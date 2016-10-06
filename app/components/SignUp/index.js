/* @flow */

import React from 'react';
import lifecycle from 'recompose/lifecycle';

const SignUp = () => <div />;

const enhance = lifecycle({
  componentDidMount() {
    this.props.route.auth0Lock.show({ initialScreen: 'signUp' });
  },
  componentWillUnmount() {
    this.props.route.auth0Lock.hide();
  },
});

export default enhance(SignUp);
