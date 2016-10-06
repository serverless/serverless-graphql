/* @flow */

import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';
import type { ReactChildren } from '../../types/react';

type Props = {
  className?: string,
  children?: ReactChildren,
};

const Button = ({ className, children, ...otherProps }: Props) => (
  <button {...otherProps} className={classnames(styles.root, className)}>
    {children}
  </button>
);

export default Button;
