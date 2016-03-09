import { graphql } from 'graphql';
import AdminSchema from '../graphql/AdminSchema';

export function runAdminGraphQL(event, cb) {

  let query = event.query;

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  graphql(AdminSchema, query).then( function(result) {
    return cb(null, result);
  });

}
