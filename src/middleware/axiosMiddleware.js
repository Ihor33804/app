import axios from 'axios';
import NavigationService from '../routers/NavigationService';
import Toast from 'react-native-root-toast';

import config from '../config';
import { NETWORK_FAILURE, TOKEN_NOT_VALID, WEBSOCKET_DISCONNECT } from '../store/actionTypes';

export default store => next => (action) => {
  if (action.url && !action.formData) {
    const {
      url, method, params, payload, ...rest
    } = action;
    const state = store.getState();
    const { token } = state.authReducer;

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      url,
      method,
      payload,
      params,
    });

    axios({
      url: /^(https?:\/\/)/.test(url) ? url : `${config.apiUrl}${url}`,
      method: method || 'GET',
      data: payload,
      params,
      headers: (token) ? {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        ...action.headers,
      }
        : {
          'Content-Type': 'application/json',
          ...action.headers,
        },
    }).then((response) => {
      if (response.data.status >= 400) throw response.data.message;
      if (action.sNav) action.sNav(); 
     next({
        ...rest,
        type: `${rest.type}_SUCCESS`,
        payload: response.data,
        params,
        status: response.status,
      });
    }).catch((error) => {
      __DEV__ && console.info(error.response);
      if (error.response.status === 401) {
        if (error.response.data.reason === "confirmation_needed") {
          NavigationService.navigate('confirm');
        } else {
          NavigationService.navigate('authorization');
          next({
            type: TOKEN_NOT_VALID,
            payload: error.response
          });
          next({
            type: WEBSOCKET_DISCONNECT,
          });
        }
      }
      if (error.response.status === 400) {
        Toast.show(error.response.data.error, {
          duration: Toast.durations.SMALL,
          position: Toast.positions.BOTTOM});
      }
      if (error.message === 'Network Error') {
        next({
          type: NETWORK_FAILURE,
        });
      }
      return next({
        ...rest,
        type: `${rest.type}_FAILURE`,
        errorMessage: error.response.data.error,
        error,
      });
    });
  } else {
    return next(action);
  }
};
