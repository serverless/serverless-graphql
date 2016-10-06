/* @flow */

import { mapValues } from 'lodash';

export default (db) => (
  mapValues(db, (value, key) => (
    (payload, context) => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`----> ${key} - ${JSON.stringify(payload)}`);
      }
      return value(payload, context);
    }
  ))
);
