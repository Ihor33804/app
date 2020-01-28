import {
  PUT_UPDATE,
  GET_SENDERS,
  PUT_CHANGE_PASSWORD,
  GET_USER_CONTRACTS,
  ADD_USER_CONTRACT
} from '../store/actionTypes';
import NavigationService from '../routers/NavigationService';

export const update = sender => ({
  type: PUT_UPDATE,
  url: 'senders/',
  method: 'PUT',
  payload: { sender },
});

export const getSenders = () => ({
  type: GET_SENDERS,
  url: 'senders/',
  method: 'GET',
});

export const changePassword = (params) =>({
  type: PUT_CHANGE_PASSWORD,
  method: 'PUT',
  url: 'profile/change_password/',
  payload: params
})

export const getContracts = (id) =>({
  type: GET_USER_CONTRACTS,
  method: 'GET',
  url: `contracts/?sender_id=${id}`,
})

export const addContract = (params) =>({
  type: ADD_USER_CONTRACT,
  method: 'PUT',
  url: 'contracts/',
  payload: params
})
