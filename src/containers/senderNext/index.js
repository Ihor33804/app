import React, { Component } from 'react';
import { View } from 'react-native';
import {
   Container,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import CHeader from '../../components/header/CHeader';
import List from '../../components/List';

class SenderNext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  clickFunc = (uid) => {
    this.props.navigation.navigate('messages');
  }
  
  render() {
    const { navigation, listUsers } = this.props;
    
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
          contentContainerStyle={styles.keyboardStyle}>
          <View style={styles.mainContainer}>
            <CHeader navigation={navigation} text={'Home'} menuBtn={true}/>
            <View style={styles.top}>
            {
              (listUsers.length>=1) && 
              <View style={styles.listWrap}>
                <List onClick={this.clickFunc} data={listUsers} />
              </View>
            }
            </View>
            <Toast ref="toast" position='top' opacity={0.8} style={styles.toast} textStyle={styles.toastText} fadeInDuration={100} fadeOutDuration={500} />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    listUsers: state.senderReducer.listUsers,
    isRequest: state.userReducer.isRequest,
  } 
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(SenderNext);
