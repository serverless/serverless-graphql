/* @flow */

import { mapValues } from 'lodash';

export default (db: Object): Object => (
  mapValues(db, value =>
    (payload, context) => (
      Promise.resolve(value(payload, context))
    )
  )
);
