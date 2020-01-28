import { StyleSheet } from 'react-native';

import {
  ORANGE,
  LIGHT_GREY,
  BORDER_COLOR,
  WHITE_COLOR,
} from '../../../styles/constants';
import variables, { scale } from '../../../styles/variables';

const { regular } = variables.fontSize;

export default StyleSheet.create({
  item: {
    borderColor: BORDER_COLOR,
    borderBottomWidth: 0.5,
    paddingVertical: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badge: {
    backgroundColor: ORANGE,
    position: 'absolute',
    // top: scale(0),
    right: scale(0),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: WHITE_COLOR,
  },
  itemImage: {
    width: scale(40),
    height: scale(40),
    textAlign: 'center'
  },
  itemText: {
    paddingRight: scale(15),
    fontSize: regular,
    color: LIGHT_GREY,
    textAlign: 'center',
  },
});
