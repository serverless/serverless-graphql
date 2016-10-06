/* @flow */

import uuid from 'uuid-js';

type Params = {};

// Note: This is where your code should go to fetch a real user.
export default async (_params: Params): Promise<any> => ({
  id: uuid.create().toString(),
  name: 'Ada Lovelace',
});
