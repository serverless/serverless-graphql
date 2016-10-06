/* @flow */

import { graphql } from 'graphql';
import Schema from './schema';

export default (query: Object, variables: Object) => (
  graphql(Schema, query, null, {}, variables)
);
