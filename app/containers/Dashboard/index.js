/* @flow */

import React from 'react';
import Relay from 'react-relay';
import compose from 'recompose/compose';
import Content from '../../components/Content';
import Block from '../../components/Block';
import styles from './styles.css';
import {
  createContainer,
} from '../../utils';

type Props = {
  viewer: {
    name: string,
  }
}

const Dashboard = (props: Props) => (
  <Content compact className={styles.root}>
    <Block>
      Welcome {props.viewer.name}!
    </Block>
  </Content>
);

export default compose(
  createContainer({
    fragments: {
      viewer: () => (
        Relay.QL`
          fragment on User {
            name
          }
        `
      ),
    },
  })
)(Dashboard);
