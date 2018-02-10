import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react/dist/Auth';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Homepage from './routes/Homepage';
import Profile from './routes/Profile';
import Search from './routes/Search';
import { Footer } from './components/helpers';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_AUTH_REGION, // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.REACT_APP_USER_POOL_ID, // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.REACT_APP_CLIENT_APP_ID, // User Pool App Client ID
  },
});

const client = new AWSAppSyncClient({
  //pass object in the constructor with properties
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: process.env.REACT_APP_AWS_CLIENT_REGION,
  auth: {
    //property of a js object
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

const WithProvider = () => (
  //react function component
  <Router>
    {' '}
    // context allows you to pass info from multiple level of components, so
    Route can access info from Router.
    <ApolloProvider client={client}>
      {' '}
      //pass instantiatied client in ApolloProvider component
      <Rehydrated>
        <Route exact path="/" component={Homepage} />
        <Route path="/search" component={Search} />
        <Route path="/@:handle" component={Profile} />
        <Footer>
          <Link to="/">Home</Link> //special link without rerendering the entire
          page, render the subroute and optimize rendering
          <span> | </span>
          <Link to="/search">Search</Link>
        </Footer>
      </Rehydrated>
    </ApolloProvider>
  </Router>
);

export default withAuthenticator(WithProvider, { includeGreetings: true });
