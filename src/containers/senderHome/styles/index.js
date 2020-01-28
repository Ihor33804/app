import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  WHITE_COLOR,
  ORANGE,
  LIGHT_GREY,
} from '../../../styles/constants';

const { regular } = variables.fontSize;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: WHITE_COLOR,
  },
  mainContainer: {
    backgroundColor: WHITE_COLOR,
    flexDirection: 'column',
    flexGrow: 1,
  },
  keyboardStyle: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  top: {
    paddingTop: scale(25),
    paddingHorizontal: scale(15)
  },
  listWrap: {
    paddingVertical: scale(15),
  },
  inputWrap: {
    width: '100%',
  },
  input: {
    fontSize: regular,
    justifyContent: 'center',
    paddingRight: scale(40),
    height: scale(40)
  },
  button: {
    width: scale(130),
    paddingVertical: scale(15),
    backgroundColor: ORANGE,
    marginTop: scale(15),
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
    fontSize: regular,
  },
  toast: {
    marginHorizontal: scale(10),
  },
  toastText: {
    textAlign: 'center',
    color: 'white',
  },
  closeBtn: {
    color: LIGHT_GREY,
  },
});
