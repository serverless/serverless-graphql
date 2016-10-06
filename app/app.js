
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
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import VerifyEmail from './components/VerifyEmail';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import {
  initializeAuth0Lock,
  initializeXsrfToken,
  parseAuthHash,
  isAuthenticated,
  setRelayNetworkLayer,
  setRedirectLocation,
  getRedirectLocation,
} from './utils';

initializeXsrfToken();
setRelayNetworkLayer();
const auth0Lock = initializeAuth0Lock();

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

function handleAuth({ location }, replace) {
  const { authenticated, reason } = parseAuthHash(location.hash);
  if (authenticated) {
    setRelayNetworkLayer();
    replace(getRedirectLocation());
  } else if (reason === 'email-not-verified') {
    replace({ pathname: '/verify-email' });
  } else {
    replace({ pathname: '/sign-in' });
  }
}

function requireAuth({ location }, replace) {
  if (!isAuthenticated()) {
    setRedirectLocation(location);
    if (location.pathname === '/') {
      replace({ pathname: '/welcome' });
    } else {
      replace({ pathname: '/sign-in' });
    }
  }
}

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay.default)}
    environment={Relay.Store}
  >
    <Route
      path="/sign-in-success"
      component={() => (<div>Authenticating …</div>)}
      onEnter={handleAuth}
    />
    <Route
      path="/welcome"
      component={Welcome}
    />
    <Route
      path="/verify-email"
      component={VerifyEmail}
    />
    <Route
      path="/sign-in"
      component={SignIn}
      auth0Lock={auth0Lock}
    />
    <Route
      path="/sign-up"
      component={SignUp}
      auth0Lock={auth0Lock}
    />
    <Route
      path="/"
      component={App}
      render={renderAppRoute}
      onEnter={requireAuth}
    >
      <IndexRoute
        component={Dashboard}
        queries={DashboardQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
);
