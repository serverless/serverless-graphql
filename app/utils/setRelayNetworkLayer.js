/* @flow */

import Relay from 'react-relay';

export default () => {
  if (!process.env.GRAPHQL_ENDPOINT) { throw new Error('GRAPHQL_ENDPOINT is not defined'); }

  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(process.env.GRAPHQL_ENDPOINT, {
      fetchTimeout: 30000,
    })
  );
};
