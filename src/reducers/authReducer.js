import OneSignal from 'react-native-onesignal';
import initialState from '../store/initialState';
import injectReducer from '../store/injectReducer';

import {
  POST_SING_UP_SUCCESS,
  POST_SING_UP_FAILURE,
  POST_SING_UP_REQUEST,
  POST_SING_IN_SUCCESS,
  POST_SING_IN_FAILURE,
  POST_SING_IN_REQUEST,
  POST_CONFIRM_SUCCESS,
  POST_CONFIRM_FAILURE,
  // PUT_UPDATE_SUCCESS,
  // PUT_UPDATE_FAILURE,
  // PUT_UPDATE_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  // GET_SENDERS_SUCCESS,
  // GET_SENDERS_FAILURE,
  CLEAR_ERROR,
  SING_OUT,
  UPDATE_MESSAGE_COUNT,
  TOKEN_NOT_VALID,
  GET_PROFILE_DATA_REQUEST,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA_FAILURE,
  PUT_EDIT_PROFILE_SUCCESS
} from '../store/actionTypes';

export default injectReducer(initialState.authReducer, {
  [POST_SING_UP_SUCCESS]: (state, action) => ({
    ...state,
    dataUser: action.payload,
    error: '',
    isRequest: false,
  }),
  [POST_SING_UP_REQUEST]: state => ({
    ...state,
    isRequest: true,
  }),
  [POST_SING_UP_FAILURE]: (state, action) => ({
    ...state,
    isRequest: false,
  }),
  [POST_SING_IN_SUCCESS]: (state, action) => {
    OneSignal.sendTag('user_id', JSON.stringify(action.payload.id));
    return {
      ...state,
      token: action.payload.token,
      role: action.payload.role,
      user_id: action.payload.id,
      fullName: action.payload.full_name,
      image: action.payload.image,
      error: '',
      isRequest: false,
    };
  },
  [POST_SING_IN_REQUEST]: state => ({
    ...state,
    isRequest: true,
  }),
  [POST_SING_IN_FAILURE]: (state, action) => ({
    ...state,
    dataUser: (action.error.response.data.user_data) ? action.error.response.data.user_data : {},
    isRequest: false,
  }),
  [POST_CONFIRM_SUCCESS]: (state, action) => {
    OneSignal.sendTag('user_id', JSON.stringify(action.payload.user_detail.id));
    return {
      ...state,
      confirmation_code: action,
      token: action.payload.token,
      role: action.payload.user_detail.role,
      profileData: action.payload.user_detail,
      // email: action.payload.userDetail.email,
      // phone: action.payload.userDetail.phone,
      // user_id: action.payload.userDetail.id,
      error: '',
    };
  },
  [POST_CONFIRM_FAILURE]: (state, action) => ({
    ...state,
  }),
  // [PUT_UPDATE_REQUEST]: state => ({
  //   ...state,
  //   isRequest: true,
  // }),
  // [PUT_UPDATE_SUCCESS]: (state, action) => ({
  //   ...state,
  //   senders: action.payload.recipient_user.senders,
  //   isRequest: false,
  // }),
  // [PUT_UPDATE_FAILURE]: (state, action) => ({
  //   ...state,
  //   error: action.errorMessage,
  //   isRequest: false,
  // }),
  [GET_MESSAGES_SUCCESS]: (state, action) => {
    const newArray = [];
    state.senders.forEach((item) => {
      newArray.push(Object.assign({}, item));
    });
    newArray.find((item) => item.uniq_identifi === action.params.sender).listMessages = action.payload;
    newArray.find((item) => item.uniq_identifi === action.params.sender).messages = 0;
    return {
      ...state,
      senders: newArray,
    };
  },
  [GET_MESSAGES_FAILURE]: (state, action) => ({
    ...state,
    error: action.errorMessage,
  }),
  // [GET_SENDERS_SUCCESS]: (state, action) => ({
  //   ...state,
  //   senders: action.payload.userDetail.senders,
  // }),
  // [GET_SENDERS_FAILURE]: (state, action) => ({
  //   ...state,
  //   error: action.error.response.status,
  // }),
  [CLEAR_ERROR]: state => ({
    ...state,
    error: '',
  }),
  [SING_OUT]: state => (
    OneSignal.deleteTag('user_id'),
    {
      ...state,
      ...initialState.authReducer,
    }),
  [TOKEN_NOT_VALID]: (state, action) => (
    OneSignal.deleteTag('user_id'),
    {
      ...state,
      error: action,
    }),
  [UPDATE_MESSAGE_COUNT]: (state, action) => {
    // const newArray = [];
    // state.senders.forEach((item) => {
    //   newArray.push(Object.assign({}, item));
    // });
    // newArray.find((item) => item.uniq_identifi === action.payload.sender_id).messages += 1;
    // if (newArray.find((item) => item.uniq_identifi === action.payload.sender_id).listMessages) {
    //   newArray.find((item) => item.uniq_identifi === action.payload.sender_id).listMessages.unshift(action.payload);
    // }
    return {
      ...state,
      // senders: newArray,
    };
  },
  [GET_PROFILE_DATA_REQUEST]: (state) =>({
    ...state,
    isRequest: true
  }),
  [GET_PROFILE_DATA_SUCCESS]: (state, action) =>({
    ...state,
    isRequest: false,
    profileData: action.payload.user_detail
  }),
  [GET_PROFILE_DATA_FAILURE]: (state, action) =>({
    ...state,
    isRequest: false
  }),
  [PUT_EDIT_PROFILE_SUCCESS]: (state, action) =>({
    ...state,
    profileData: JSON.parse(action.payload).user_detail,
    fullName: JSON.parse(action.payload).user_detail.last_name +' '+ JSON.parse(action.payload).user_detail.first_name,
    image: JSON.parse(action.payload).user_detail.image
  })
});
