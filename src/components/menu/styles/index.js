import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  LIGHT_GREY,
  WHITE_COLOR
} from '../../../styles/constants';

const { regular } = variables.fontSize;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: scale(20)
    },
    content: {
			flex: 1
    },
    mainBlock: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			height: scale(80),
			paddingHorizontal: scale(15),
			backgroundColor: LIGHT_GREY,
    },
    photo: {
			width: scale(50),
			height: scale(50),
			marginRight: scale(15),
			borderRadius: scale(25)
    },
    textName: {
			fontSize: regular,
			color: WHITE_COLOR
		},
		item: {
			padding: scale(15)
    },
    itemBottom: {
			borderTopWidth: 0.5,
			borderColor: LIGHT_GREY,
			padding: scale(15)
    },
    textItem: {
			fontSize: regular
    }
  });