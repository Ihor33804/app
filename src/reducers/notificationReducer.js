import initialState from '../store/initialState';
import injectReducer from '../store/injectReducer';

import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_SEND,
} from '../store/actionTypes';

export default injectReducer(initialState.notificationReducer, {
  [WEBSOCKET_CONNECT]: state => ({
    ...state,
    connected: true,
  }),
  [WEBSOCKET_DISCONNECT]: state => ({
    ...state,
    connected: false,
  }),
  [WEBSOCKET_SEND]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
});
