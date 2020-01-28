import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_SEND,
} from '../store/actionTypes';

export const wConnect = token => ({
  type: WEBSOCKET_CONNECT,
  payload: { token },
});

export const wDisconnect = () => ({
  type: WEBSOCKET_DISCONNECT,
});

export const wSend = message => ({
  type: WEBSOCKET_SEND,
  payload: { message },
});
