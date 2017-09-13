import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

const Button = ({ className, children, ...otherProps }) => (
  <button {...otherProps} className={classnames(styles.root, className)}>
    {children}
  </button>
);

export default Button;
