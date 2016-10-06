/* @flow */

import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

export default () => (
  <div className={styles.root}>
    <h1 className={styles.headline}>Welcome!</h1>
    <div>
      <Link to={{ pathname: '/sign-up' }} className={styles.signUp}>
        Sign up
      </Link>
    </div>
    <div className={styles.or}>or</div>
    <div>
      <Link to={{ pathname: '/sign-in' }} className={styles.signIn}>Sign in</Link>
    </div>
  </div>
);
