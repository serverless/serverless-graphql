import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function classes(props) {
  return classnames(styles.main, props.className, {
    [styles.padding]: props.padding,
  });
}

const Block = (props) => (
  <div className={classes(props)}>
    {props.children}
  </div>
);

export default Block;
