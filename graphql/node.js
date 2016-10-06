/* @flow */

/* eslint-disable no-underscore-dangle */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import db from './database';

const idResolver = (globalId, context) => {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'User') {
    return db.getUser({ id }, context);
  }
  return null;
};

const typeResolver = (object) => {
  if (object._type === 'user') {
    return require('./types/user').default; // eslint-disable-line global-require
  }
  return null;
};

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
export const { nodeInterface, nodeField } = nodeDefinitions(idResolver, typeResolver);
