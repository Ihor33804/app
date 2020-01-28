import config from '../config';
import { wConnect } from '../actions/notificationAction';

import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSE,
  WEBSOCKET_SEND,
  UPDATE_MESSAGE_COUNT,
} from '../store/actionTypes';

export default store => next => (action) => {
  const websocket = null;
  const { dispatch } = store;
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      if (!this.websocket || this.websocket.readyState === this.websocket.CLOSED) {
        this.websocket = new WebSocket(`${config.apiWebsocket}?jwt=${action.payload.token}`);
        this.websocket.onopen = () => dispatch({
          type: WEBSOCKET_OPEN,
        });
        this.websocket.onmessage = (event) => {
          const messageData = JSON.parse(event.data);
          dispatch({
            type: UPDATE_MESSAGE_COUNT,
            payload: messageData,
          });
        };
        this.websocket.onclose = (event) => {
          dispatch({
            type: WEBSOCKET_CLOSE,
            payload: event,
          });
          if (this.websocket && this.websocket.readyState === this.websocket.CLOSED && action.payload.token) {
            dispatch(wConnect(action.payload.token));
          }
        }
      };
      break;
    // User request to send a message
    case WEBSOCKET_SEND:
    console.log(JSON.stringify(action.payload))
      this.websocket.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case WEBSOCKET_DISCONNECT:
      // this.websocket = new WebSocket(`${config.apiWebsocket}?jwt=${action.payload.token}`);
      this.websocket.close(1000);
      this.websocket = null;
      break;

    default: // We don't really need the default but ...
      break;
  }

  return next(action);
};
