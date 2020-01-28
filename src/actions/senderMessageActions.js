import {
  GET_MESSAGES,
} from '../store/actionTypes';

export const getMessages = sender => ({
  type: GET_MESSAGES,
  url: 'senders/messages/',
  method: 'GET',
  params: { sender },
});
