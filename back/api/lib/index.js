import { graphql } from 'graphql';
import PrivateSchema from './graphql/PrivateSchema';
import PublicSchema from './graphql/PublicSchema';

export function runPrivateGraphQL(event, cb) {

  let query = event.query;

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  graphql(PrivateSchema, query).then( function(result) {
    return cb(null, result);
  });

}

export function runPublicGraphQL(event, cb) {

  let query = event.query;

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  graphql(PublicSchema, query).then( function(result) {
    return cb(null, result);
  });

}
