import { graphql } from 'graphql';
import Schema from './schema';

export default (query, variables) => (
  graphql(Schema, query, null, {}, variables)
);
