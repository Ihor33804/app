import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  WHITE_COLOR,
  ORANGE,
  LIGHT_GREY,
  BLACK_COLOR,
} from '../../../styles/constants';

const {
  regular, large, x_large, x_small,
} = variables.fontSize;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: scale(40),
    paddingVertical: scale(50),
  },
  keyboardStyle: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  logoWrap: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: x_large,
    color: ORANGE,
  },
  logoText: {
    fontSize: x_large,
    textAlign: 'center',
    color: LIGHT_GREY,
  },
  btnLink: {
    textDecorationLine: 'underline',
    marginLeft: scale(5),
  },
  form: {
    flex: 10,
    justifyContent: 'center',
  },
  inputWrap: {
    marginVertical: scale(10),
    marginLeft: 0,
  },
  inputContainer: {
    fontSize: regular,
    color: BLACK_COLOR,
    justifyContent: 'center',
    width: '100%',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: scale(20),
  },
  button: {
    width: '100%',
    paddingVertical: scale(25),
    backgroundColor: ORANGE,
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
    fontSize: large,
  },
  bottomText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toast: {
    marginHorizontal: scale(10),
  },
  toastText: {
    textAlign: 'center',
    color: 'white',
  },
  smallText: {
    marginTop: scale(15),
    fontSize: x_small,
    color: LIGHT_GREY,
    textAlign: 'center',
  },
});
