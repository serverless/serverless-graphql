
/* @flow */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import AppLoading from './components/AppLoading';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import {
  setRelayNetworkLayer,
} from './utils';

setRelayNetworkLayer();

const DashboardQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

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

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay.default)}
    environment={Relay.Store}
  >
    <Route
      path="/"
      component={App}
      render={renderAppRoute}
    >
      <IndexRoute
        component={Dashboard}
        queries={DashboardQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
);
