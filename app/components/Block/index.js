/* @flow */

import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';
import type { ReactChildren } from '../../types/react';

type Props = {
  className?: string,
  padding?: boolean,
  children?: ReactChildren,
};

function classes(props: Props): string {
  return classnames(styles.main, props.className, {
    [styles.padding]: props.padding,
  });
}

const Block = (props: Props) => (
  <div className={classes(props)}>
    {props.children}
  </div>
);

export default Block;
