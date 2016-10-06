import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function classes(props) {
  return classnames(styles.main, props.className, {
    [styles.compact]: props.compact,
  });
}

const Content = (props) => (
  <div className={classes(props)}>
    {props.children}
  </div>
);

export default Content;
