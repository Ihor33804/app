import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../styles/variables';

export default class MenuBtn extends Component {

  render() {
    const { onPress, green = false } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menu}
        onPress={()=> onPress()}
        >
        <Image
          style={{width: scale(25), height: scale(25)} }
          resizeMode='contain'
          fadeDuration={0}
          source={require('../../assets/img/menu_icon.png')}
        />
      </TouchableOpacity>
    );
  }
}

MenuBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  green: PropTypes.bool
}

const styles = StyleSheet.create({
  menu: {
    width: scale(25),
    height: scale(25)
  }
});
