import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import axiosMiddleware from './axiosMiddleware';
import websocketMiddleware from './websocketMiddleware';
import fbMiddleware from './fbMiddleware';

const middlewareList = [
  axiosMiddleware,
  websocketMiddleware,
  fbMiddleware,
  thunk,
];

if (__DEV__) middlewareList.push(createLogger({ collapsed: true }));

export default applyMiddleware(...middlewareList);
