import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

export default () => (
  <span>
    <span className={styles.dot}>.</span>
    <span className={classnames(styles.dot, styles.dotTwo)}>.</span>
    <span className={classnames(styles.dot, styles.dotThree)}>.</span>
  </span>
);
