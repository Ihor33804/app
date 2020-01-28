import RNFetchBlob from 'rn-fetch-blob';
import config from './../config';
import NavigationService from '../routers/NavigationService';

export default store => next => action => {
  if (action.formData) {
    const { url, method, payload, ...rest } = action;
    const state = store.getState();
    const { token } = state.authReducer;

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      url,
      method,
      payload
    });

    RNFetchBlob.fetch(method, /^(https?:\/\/)/.test(url) ? url : `${config.apiUrl}${url}`,
      {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      }, 
      payload
    ).then((response) => {
      if (response && response.respInfo.status >= 400) throw response;
      if (action.sNav) action.sNav();

      return next({
        ...rest,
        type: `${rest.type}_SUCCESS`,
        payload: response.data
      });
    }).catch((error) => {
      __DEV__ && console.log('err', error);
      return next({
        ...rest,
        type: `${rest.type}_FAILURE`,
        errorMessage: error.message,
        error
      });
    })
  } else {
    return next(action);
  }
}
