/* @flow */

import { graphql } from 'graphql';
import authenticate from './authenticate';
import buildContext from './buildContext';
import Schema from './schema';

export default (query: Object, variables: Object, authHeader: string) => {
  const decodedPayload = authenticate(authHeader);

  if (decodedPayload) {
    const context = buildContext(decodedPayload.sub);
    return graphql(Schema, query, null, context, variables);
  }

  throw new Error('Authentication Failed');
};
