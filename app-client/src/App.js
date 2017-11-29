import React, { Component } from 'react';
import UserList from './components/UserList';
import logo from './logo.svg';
import './App.css';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import * as AWS from 'aws-sdk';
import awsconfig from './aws-exports';

AWS.config.update({
  region: awsconfig.REGION,
  credentials: new AWS.Credentials({
    accessKeyId: awsconfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsconfig.AWS_SECRET_ACCESS_KEY,
  }),
});

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: 'us-east-1',
  auth: { type: AUTH_TYPE.AWS_IAM, credentials: null },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Serverless GraphQL Apollo </h2>
        </div>
        <div className="App-User">
          <UserList />
        </div>
      </div>
    );
  }
}

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
