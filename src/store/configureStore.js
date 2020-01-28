import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { offlineActionTypes, checkInternetConnection } from 'react-native-offline';
import storage from 'redux-persist/lib/storage';

import reducer from '../reducers';
import middleware from '../middleware';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer', 'notificationReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(callback) {
  const store = createStore(
    persistedReducer,
    middleware,
  );

  persistStore(store, null, () => {
    checkInternetConnection().then((isConnected) => {
      store.dispatch({
        type: offlineActionTypes.CONNECTION_CHANGE,
        payload: isConnected,
      });
      callback();
    });
  });

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
