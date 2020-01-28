import { StyleSheet } from 'react-native';

import variables, { scale, localHeight } from '../../../styles/variables';
import { WHITE_COLOR, LIGHT_GREY } from '../../../styles/constants';

const { regular } = variables.fontSize;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: WHITE_COLOR,
  },
  content: {
    width: '100%',
    alignItems: 'center', 
    padding: scale(15),
    height: localHeight-scale(75),
    justifyContent: 'space-between' 
  },
  photoBlock: {
    flex: 1
  },
  photoWrap: {
    width: scale(160), 
    height: scale(160),
  },
  photo: {
    width: scale(150), 
    height: scale(150), 
    borderRadius: scale(75),
  },
  textPhoto: {
    textAlign: 'center',
    paddingVertical: scale(10) 
  },
  inputsBlock: {
    flex: 1
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
  btnWrap: {
    paddingHorizontal: scale(25)
  }
});
