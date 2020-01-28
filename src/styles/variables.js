import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const localWidth = (screenWidth >= screenHeight) ? screenHeight : screenWidth;
const widthCoef = localWidth / 360;

export const scale = size => widthCoef * size;
export const localHeight = (screenWidth >= screenHeight) ? screenWidth : screenHeight;

const variables = {
  fontSize: {
    x_small: (localWidth * 11) / 360,
    small: (localWidth * 13) / 360,
    regular: (localWidth * 15) / 360,
    large: (localWidth * 20) / 360,
    x_large: (localWidth * 30) / 360,
    xx_large: (localWidth * 38) / 360,
  },
};

export default variables;
