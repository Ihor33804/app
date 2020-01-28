import { StyleSheet } from 'react-native';

import variables, { scale, localHeight } from '../../../../styles/variables';
import { WHITE_COLOR, LIGHT_GREY, ORANGE, BLACK_COLOR } from '../../../../styles/constants';

const { regular, small } = variables.fontSize;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: WHITE_COLOR,
    paddingVertical: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: LIGHT_GREY,
  },
  content: {
    width: '75%',
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between', 
    flexWrap: 'wrap'
  },
  imgWrap: {
    width: '25%',
    alignItems: 'center'
  },
  img: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30)
  },
  mainText: {
    width: '100%',
    fontSize: regular,
    color: BLACK_COLOR
  },
  messageText: {
    width: '100%',
    fontSize: small,
    paddingVertical: scale(5)
  },
  date: {
    width: '50%',
    fontSize: small
  },
  btn: {
    width: '50%',
  },
  btnText: {
    color: ORANGE,
    textAlign: 'right'
  },
  badge: {
    backgroundColor: ORANGE,
    position: 'absolute',
    top: scale(5),
    right: scale(5),
    minWidth: scale(27),
    height: scale(27),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: WHITE_COLOR,
    fontSize: small
  },
});
