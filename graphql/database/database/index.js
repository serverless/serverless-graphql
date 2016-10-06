/* @flow */

import wrapLogger from '../../utils/wrapLogger';
import type { Database } from '../type';

import getViewer from './getViewer';

const database: Database = {
  getViewer,
};

export default wrapLogger(database);
