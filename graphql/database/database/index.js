import wrapLogger from '../../utils/wrapLogger';
import getViewer from './getViewer';

const database = {
  getViewer,
};

export default wrapLogger(database);
