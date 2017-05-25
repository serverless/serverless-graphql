import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {
  createNetworkInterface,
} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import App from './containers/App';
import Dashboard from './containers/Dashboard';

if (!process.env.GRAPHQL_ENDPOINT) {
  throw new Error('GRAPHQL_ENDPOINT is not defined');
}
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.GRAPHQL_ENDPOINT,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App>
        <Route
          path="/"
          component={Dashboard}
        />
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
