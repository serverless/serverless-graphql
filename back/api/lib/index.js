import { graphql } from 'graphql';
import Schema from './schema'

export function query(query) {

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && query.hasOwnProperty('query')) {
    query = query.query.replace("\n", ' ', "g");
  }

  graphql(Schema, query).then( function(result) {
    return cb(null, result);
  });
}
