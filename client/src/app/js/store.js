import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, createLogger()),
  applyMiddleware(routerMiddleware(hashHistory)),
  devTools
)(createStore);

export default createStoreWithMiddleware(reducers);