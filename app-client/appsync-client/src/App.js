import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react/dist/Auth';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Homepage from './routes/Homepage';
import Profile from './routes/Profile';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_AUTH_REGION, // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.REACT_APP_USER_POOL_ID, // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.REACT_APP_CLIENT_APP_ID, // User Pool App Client ID
  },
});

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: process.env.REACT_APP_AWS_CLIENT_REGION,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

const WithProvider = () => (
  <Router>
    <ApolloProvider client={client}>
      <Rehydrated>
        <Route exact path="/" component={Homepage} />
        <Route path="/:handle" component={Profile} />
      </Rehydrated>
    </ApolloProvider>
  </Router>
);

export default withAuthenticator(WithProvider, { includeGreetings: true });
