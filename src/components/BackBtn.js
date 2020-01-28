import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../styles/variables';

export default class BackBtn extends Component {

  render() {
    const { onPress, green = false } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.back}
        onPress={()=> onPress()}
        >
        <Image
          style={{width: scale(25), height: scale(25)} }
          resizeMode='contain'
          fadeDuration={0}
          source={require('../../assets/img/arrow_white.png')}
        />
      </TouchableOpacity>
    );
  }
}

BackBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  green: PropTypes.bool
}

const styles = StyleSheet.create({
  back: {
    width: scale(25),
    height: scale(25)
  }
});
