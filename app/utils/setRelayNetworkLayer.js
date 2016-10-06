/* @flow */

import Relay from 'react-relay';
import { getAuthToken } from './authToken';

type Headers = {
  Authorization?: string,
};

function headers(): Headers {
  const authToken = getAuthToken();
  if (!authToken) return {};

  return {
    Authorization: `Bearer ${authToken}`,
  };
}

export default () => {
  if (!process.env.GRAPHQL_ENDPOINT) { throw new Error('GRAPHQL_ENDPOINT is not defined'); }

  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(process.env.GRAPHQL_ENDPOINT, {
      fetchTimeout: 30000,
      headers: headers(),
    })
  );
};
