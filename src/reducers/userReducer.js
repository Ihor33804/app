import initialState from '../store/initialState';
import injectReducer from '../store/injectReducer';
import Toast from 'react-native-root-toast';

import {
  GET_SENDERS_REQUEST,
  GET_SENDERS_SUCCESS,
  GET_SENDERS_FAILURE,
  PUT_UPDATE_SUCCESS,
  PUT_UPDATE_FAILURE,
  PUT_UPDATE_REQUEST,
  GET_USER_CONTRACTS_SUCCESS,
  GET_USER_CONTRACTS_REQUEST,
  ADD_USER_CONTRACT_REQUEST,
  ADD_USER_CONTRACT_SUCCESS 
} from '../store/actionTypes';

export default injectReducer(initialState.userReducer, {
  [GET_SENDERS_REQUEST]: (state) =>({
      ...state,
      isRequest: true
  }),  
  [GET_SENDERS_SUCCESS]: (state, action) => ({
    ...state,
    senders: action.payload.items_list,
    isRequest: false
  }),
  [GET_SENDERS_FAILURE]: (state, action) => ({
    ...state,
    error: action.error.response.status,
    isRequest: false
  }),
  [PUT_UPDATE_REQUEST]: state => ({
    ...state,
    isRequest: true,
  }),
  [PUT_UPDATE_SUCCESS]: (state, action) => ({
    ...state,
    senders: action.payload.items_list,
    isRequest: false,
  }),
  [PUT_UPDATE_FAILURE]: (state, action) => ({
    ...state,
    error: action.errorMessage,
    isRequest: false,
  }),
  [GET_USER_CONTRACTS_SUCCESS]: (state, action) =>({
    ...state,
    isRequest: false,
    contracts: action.payload
  }),
  [GET_USER_CONTRACTS_REQUEST]: (state) =>({
    ...state,
    isRequest: true
  }),
  [ADD_USER_CONTRACT_REQUEST]: (state) =>({
    ...state,
    isRequest: true
  }),
  [ADD_USER_CONTRACT_SUCCESS]: (state, action) =>(Toast.show('Ждите подтверждения от отправителя', {duration: Toast.durations.SMALL, position: Toast.positions.BOTTOM}),{
    ...state,
    isRequest: false,
    contracts: [...state.contracts, action.payload]
  }) 
});
