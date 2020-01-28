import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, CheckBox } from 'react-native';
import { Text, Badge } from 'native-base';
import styles from './styles';

export default class List extends Component {
  render() {
    const { data, onClick, checkFunc} = this.props;

    console.log(data);

    return (
      data.map((item, i) => (
        <View key={i} style={styles.item}>
        {
          (checkFunc) &&
          <CheckBox 
            value={item.check}
            onValueChange={() => checkFunc(item.id)}
          />
        }
          <TouchableOpacity
            onPress={() => onClick(item.unique_identifier)}
            style={{width: (checkFunc) ? '85%' : '100%'}}
            >
            <Text style={styles.itemText}>{item.full_name}</Text>
          </TouchableOpacity>
          {(item.new_count > 0) && (
              <Badge style={styles.badge}>
                <Text style={styles.badgeText}>{item.new_count}</Text>
              </Badge>
            )}
        </View>
      ))
    );
  }
}

List.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.number,
    numberNotificate: PropTypes.number,
  })),
  onClick: PropTypes.func,
};
