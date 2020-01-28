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
    justifyContent: 'space-between' 
  },
//   buttonsWrap: {
//     flexDirection: 'row',
//     position: 'absolute',
//     zIndex: 10,
//     bottom: 0,
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingVertical: scale(10),
//   },
  btnLeft: {
    position: 'absolute',
    zIndex: 10,
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    bottom: scale(15),
    left: scale(80),
    shadowColor: BLACK_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
        height: 3,
        width: 0
    },
    elevation: 5,
  },
  btnRight: {
    position: 'absolute',
    backgroundColor: WHITE_COLOR,
    zIndex: 10,
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    bottom: scale(15),
    right: scale(80),
    shadowColor: BLACK_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
        height: 3,
        width: 0
    },
    elevation: 5,
  },
  imgBtn: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
  },
  emptyBlock: {
      width: '100%', 
      height: scale(100)
    }
});
