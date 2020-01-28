import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { styles } from './styles';
import { singOut } from '../../actions/authActions';
import { wDisconnect } from '../../actions/notificationAction';

class Menu extends Component {

  logOut = () =>{
    const { wDisconnect, singOut, navigation } = this.props;
    wDisconnect();
    singOut();
    navigation.navigate('authorization');
  }

  render() {
    const {fullName, image, navigation} = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.mainBlock}>
            <Image style={styles.photo} source={(image) ? {uri: image} : require('../../../assets/img/ava.png')}/>
            <Text style={styles.textName}>{(fullName) ? fullName : 'User'}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={()=>{navigation.navigate('settings')}}>
            <Text style={styles.textItem}>Настройки Профиля</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={()=>{navigation.navigate('changePass')}}>
            <Text style={styles.textItem}>Изменить пароль</Text>
          </TouchableOpacity>
        </View>  
        <TouchableOpacity activeOpacity={0.8} style={styles.itemBottom} onPress={()=>{this.logOut()}}>
          <Text style={styles.textItem}>Выйти</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = ({ authReducer }) => ({
  fullName: authReducer.fullName,
  image: authReducer.image
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { singOut, wDisconnect },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);