/* @flow */

import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';
import type { ReactChildren } from '../../types/react';

type Props = {
  className?: string,
  compact?: boolean,
  children?: ReactChildren,
};


function classes(props: Props): string {
  return classnames(styles.main, props.className, {
    [styles.compact]: props.compact,
  });
}

const Content = (props: Props) => (
  <div className={classes(props)}>
    {props.children}
  </div>
);

export default Content;
