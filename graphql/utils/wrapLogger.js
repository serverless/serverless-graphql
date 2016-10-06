/* @flow */

import { mapValues } from 'lodash';

export default (db: Object): Object => (
  mapValues(db, (value, key: string) => (
    (payload, context) => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`----> ${key} - ${JSON.stringify(payload)}`);
      }
      return value(payload, context);
    }
  ))
);
