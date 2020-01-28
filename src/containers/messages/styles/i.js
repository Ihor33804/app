import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  LIGHT_GREY,
  WHITE_COLOR,
  ORANGE,
  BLACK_COLOR,
} from '../../../styles/constants';

const { regular, x_small, small } = variables.fontSize;

export default StyleSheet.create({
  wrapContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  root: {
    backgroundColor: WHITE_COLOR,
  },
  container: {
    padding: scale(16),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: WHITE_COLOR,
    alignItems: 'flex-start',
  },
  icon: {
    color: ORANGE,
    fontSize: scale(24)
  },
  text: {
    marginBottom: scale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainText: {
    fontSize: small,
  },
  content: {
    flex: 1,
    marginLeft: scale(16),
    marginRight: 0,
  },
  img: {
    height: scale(50),
    width: scale(50),
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: scale(50),
    width: scale(50),
  },
  separator: {
    height: 1,
    backgroundColor: LIGHT_GREY,
  },
  timeAgo: {
    fontSize: x_small,
    color: LIGHT_GREY,
  },
  name: {
    fontSize: regular,
    color: BLACK_COLOR,
  },
  smallText: {
    marginTop: scale(15),
    fontSize: x_small,
    color: LIGHT_GREY,
    textAlign: 'center',
  },
});
