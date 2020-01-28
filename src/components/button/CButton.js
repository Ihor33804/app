import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button, Text
} from 'native-base';

import variables, { scale } from '../../styles/variables';
import { styles } from './styles';

export default class CButton extends Component {
  render() {
    const { text, contentContainerStyle, disabled=false, onClick } = this.props;
    
    return (
      <Button
        rounded
        style={styles.btn}
        onPress={() => onClick()}
      >
        <Text style={styles.text}>{text}</Text>
      </Button>
    );
  }
}

CButton.propTypes = {
  text : PropTypes.string.isRequired,
  contentContainerStyle: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

