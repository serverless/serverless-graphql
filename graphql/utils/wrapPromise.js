/* @flow */

import { mapValues } from 'lodash';

export default (db) => (
  mapValues(db, value =>
    (payload, context) => (
      Promise.resolve(value(payload, context))
    )
  )
);
