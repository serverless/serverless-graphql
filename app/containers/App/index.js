/* @flow */

import 'sanitize.css/sanitize.css';
import React from 'react';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router';
import styles from './styles.css';
import Progress from '../../components/Progress';
import type { ReactChildren } from '../../types/react';
import type { Router, Location } from '../../types/reactRouter';

type Props = {
  router: Router,
  location: Location,
  children?: ReactChildren,
  loading: boolean,
};

const App = (props: Props) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <Link to={{ pathname: '/' }} className={styles.logo} >
        <svg
          width="24px"
          height="35px"
          viewBox="0 0 24 35"
          version="1.1"
        >
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon id="logo_bolt" fill="#1C1C1C" points="23.4166556 3.55271368e-15 0 20.1203062 10.9774948 18.4322184 1.35583269 34.3339882 23.2454057 14.3247626 13.7391602 15.4486117" />
          </g>
        </svg>
      </Link>
      <div>
        <Progress loading={props.loading} />
      </div>
    </div>
    <div className={styles.main}>
      {props.children}
    </div>
  </div>
);

export default compose(
  withRouter,
)(App);
