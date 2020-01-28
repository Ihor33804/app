import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  Text
} from 'react-native';

import BackBtn from '../BackBtn';
import MenuBtn from '../MenuBtn';
import { styles } from './styles';

class CHeader extends Component {
  render(){
    const { navigation, backBtn, menuBtn, text } = this.props;
    return (
      <View style={ styles.container }>
      {
        (backBtn) && <BackBtn onPress={()=>{navigation.goBack()}}/>
      }
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      {
        (menuBtn) && <MenuBtn onPress={()=>{navigation.openDrawer()}}/>
      }
      </View>
    );
  }
}

export default CHeader;