import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  authReducer,
  userReducer,
  notificationReducer,
});
