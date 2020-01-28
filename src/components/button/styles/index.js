import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import { ORANGE } from '../../../styles/constants';

const { large } = variables.fontSize;

export const styles = StyleSheet.create({
    btn: {
      width: '100%', 
      backgroundColor: ORANGE 
    },
    text:{
      textAlign: 'center',
      fontSize: large,
    }
  });
  