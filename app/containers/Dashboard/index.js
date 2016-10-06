import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Content from '../../components/Content';
import Block from '../../components/Block';
import styles from './styles.css';


const Dashboard = (props) => (
  <Content compact className={styles.root}>
    <Block>
      Welcome {props.name}!
    </Block>
  </Content>
);

export default graphql(
  gql`
    {
      viewer {
        name
      }
    }
  `
)(Dashboard);
