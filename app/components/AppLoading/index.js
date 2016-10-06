import React from 'react';
import Spinner from '../Spinner';
import styles from './styles.css';

export default () => (
  <div className={styles.root}>
    <div>
      Loading
      <Spinner />
    </div>
  </div>
);
