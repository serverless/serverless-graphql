import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {
  createNetworkInterface,
} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';
import AppLoading from './components/AppLoading';
import App from './containers/App';
import Dashboard from './containers/Dashboard';

let previousAppProps = null;

function renderAppRoute({ done, props, element }) {
  if (done) {
    previousAppProps = props;
    return React.cloneElement(element, { ...props, loading: false });
  }
  // By rendering this route with the previous props the UI shows the same view
  // until it's finished fetching the new data.
  if (previousAppProps) {
    return React.cloneElement(element, { ...previousAppProps, loading: true });
  }

  return <AppLoading />;
}

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router
      history={browserHistory}
    >
      <Route
        path="/"
        component={App}
        render={renderAppRoute}
      >
        <IndexRoute
          component={Dashboard}
        />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
