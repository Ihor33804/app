import { StyleSheet } from 'react-native';

import variables, { scale, localHeight } from '../../../styles/variables';
import { WHITE_COLOR, LIGHT_GREY, ORANGE, BLACK_COLOR } from '../../../styles/constants';

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
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: scale(10),
  },
  btnActive: {
    width: '48%',
    backgroundColor: ORANGE,
  },
  btnUnActive: {
    width: '48%',
    backgroundColor: LIGHT_GREY,
  },
  smallText: {
    textAlign: 'center',
    width: '100%',
    fontSize: regular,
    color: WHITE_COLOR
  },
  input: {
    width: '100%',
    height: scale(80),
    marginTop: scale(5),
    borderRadius: scale(2),
    borderWidth: 0.5,
    borderColor: LIGHT_GREY,
    backgroundColor: WHITE_COLOR,
    textAlignVertical: 'top',
    marginTop: scale(15)
  },
  btnWrap: {
    paddingHorizontal: scale(25)
  },
  swichWrap: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: scale(10)
  },
  swichText: {
    textAlign: 'center',
    fontSize: regular,
    color: BLACK_COLOR,
    paddingHorizontal: scale(15),
  },
  img: {
      width: scale(20),
      height: scale(18)
  },
  listWrap: {
    width: '100%',
    height: scale(200),
    borderWidth: 0.5,
    borderColor: LIGHT_GREY,
    paddingHorizontal: scale(15),
  }
});
