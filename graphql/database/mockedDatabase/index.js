import uuid from 'uuid-js';
import wrapLogger from '../../utils/wrapLogger';
import wrapPromise from '../../utils/wrapPromise';

const database = {
  getViewer: (_params) => ({
    id: uuid.create().toString(),
    name: 'Ada Lovelace',
  }),
};

export default wrapLogger(wrapPromise(database));
