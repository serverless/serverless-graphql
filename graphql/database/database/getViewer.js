/* @flow */

import uuid from 'uuid-js';

type Params = {};

type Context = {
  authId: string,
};

// Note: This is where your code should go to fetch a real user.
export default async (_params: Params, { authId }: Context): Promise<any> => ({
  id: uuid.create().toString(),
  name: 'Ada Lovelace',
  authId,
});
