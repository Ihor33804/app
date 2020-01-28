import {
  POST_SING_UP,
  POST_SING_IN,
  SING_OUT,
  POST_CONFIRM,
  PUT_EDIT_PROFILE, 
  GET_PROFILE_DATA,
} from '../store/actionTypes';

import NavigationService from '../routers/NavigationService';

export const singUp = (email, phone, password, type) => ({
  type: POST_SING_UP,
  url: 'registration/',
  method: 'POST',
  payload: { email, phone, password, type },
  sNav: ()=> NavigationService.navigate('confirm'),
});

export const singIn = (email, phone, password) => ({
  type: POST_SING_IN,
  url: 'login/',
  method: 'POST',
  payload: { email, phone, password },
  // sNav: () => NavigationService.navigate('userHome'),
});

export const confirmEmail = data => ({
  type: POST_CONFIRM,
  url: 'confirmation-code/',
  method: 'POST',
  payload: data,
  // sNav: () => NavigationService.navigate('userHome'),
});

export const singOut = () => ({
  type: SING_OUT,
});

export const editProfile = (data) =>({
  type: PUT_EDIT_PROFILE,
  url: 'profile/',
  method: 'PUT',
  payload: data, 
  formData: true,
  sNav: ()=> NavigationService.navigate('home')
});

export const getProfileData = () =>({
  type: GET_PROFILE_DATA,
  url: 'profile/'
});
