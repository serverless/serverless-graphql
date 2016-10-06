import uuid from 'uuid-js';

// Note: This is where your code should go to fetch a real user.
export default async (_params) => ({
  id: uuid.create().toString(),
  name: 'Ada Lovelace',
});
