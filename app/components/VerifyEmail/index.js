/* @flow */

import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

export default () => (
  <div className={styles.root}>
    <div>Please verify your email first and then sign in.</div>
    <Link to={{ pathname: '/sign-in' }}>Sign in</Link>
  </div>
);
