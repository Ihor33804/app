import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  WHITE_COLOR,
  ORANGE,
} from '../../../styles/constants';

const {large} = variables.fontSize;

export const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: scale(50),
      backgroundColor: ORANGE,
      paddingHorizontal: scale(15),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text: {
      fontSize: large,
      color: WHITE_COLOR
    }
  });