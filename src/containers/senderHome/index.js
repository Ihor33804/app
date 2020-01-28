import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  Button, Text, Input, Item, Icon, Container,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { wConnect } from '../../actions/notificationAction';
import { update, getSenders } from '../../actions/userActions';
import { getProfileData } from '../../actions/authActions';
import { clearError } from '../../actions/errorActions';
import styles from './styles';

import CHeader from '../../components/header/CHeader';

import config from '../../config';
import List from '../../components/List';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      listData: [
				{id: 1, full_name: '1111111111111111111111111111111111111111111111111', check: false}, 
				{id: 2, full_name: '2222222', check: false}, 
				{id: 3, full_name: '33333333', check: false}, 
				{id: 4, full_name: '44444444', check: false}, 
        {id: 5, full_name: '5555555', check: false},
        {id: 1, full_name: '1111111111111111111111111111111111111111111111111', check: false}, 
				{id: 2, full_name: '2222222', check: false}, 
				{id: 3, full_name: '33333333', check: false}, 
				{id: 4, full_name: '44444444', check: false}, 
        {id: 5, full_name: '5555555', check: false},
        {id: 1, full_name: '1111111111111111111111111111111111111111111111111', check: false}, 
				{id: 2, full_name: '2222222', check: false}, 
				{id: 3, full_name: '33333333', check: false}, 
				{id: 4, full_name: '44444444', check: false}, 
				{id: 5, full_name: '5555555', check: false}
			]
    };
  }

  // componentDidMount() {
  //   const { token, getSenders, wConnect, getProfileData } = this.props;
  //   getSenders();
  //   getProfileData();
  //   wConnect(token.slice(-(token.length - 4)));
  //   OneSignal.init(config.one_signal_key, { kOSSettingsKeyInFocusDisplayOption: 0 });
  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  //   OneSignal.inFocusDisplaying(0);
  // }

  // componentWillUnmount = () => {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  // };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage) {
  //     this.refs.toast.show(this.props.errorMessage, 1500, () => {
  //       this.props.clearError();
  //     });
  //   }
  //   if (prevProps.isRequest !== this.props.isRequest && this.props.isRequest) {
  //     this.setState({ number: '' });
  //   }
  // }

  // onReceived = (notification) => {
  //   if (notification.isAppInFocus) {
  //     Alert.alert(
  //       config.app_name,
  //       notification.payload.body,
  //       [
  //         { text: 'OK', onPress: () => this.onClick(notification) },
  //       ],
  //     );
  //   }
  // }

  // onClick = (notification) => {
  //   this.props.navigation.navigate({ routeName: 'messages', params: { uid: notification.payload.additionalData.sender } })
  // }

  // onOpened = (openResult) => {
  //   if (!openResult.notification.isAppInFocus) {
  //     Alert.alert(
  //       config.app_name,
  //       openResult.notification.payload.body,
  //       [
  //         { text: 'OK', onPress: () => this.onClick(openResult.notification) },
  //       ],
  //     );
  //   }
  // }

  clickFunc = (uid) => {
    this.props.navigation.navigate({ routeName: 'userContract', params: { uid }, key: uid });
  }

	changeSelect = (id) =>{
		const { listData } = this.state;
		
    objIndex = listData.findIndex((obj => obj.id == id));
    listData[objIndex].check = !listData[objIndex].check;
		this.setState({listData: listData});
	}
  
  

  render() {
    const { navigation } = this.props;
    const { number, listData } = this.state;
    
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
          contentContainerStyle={styles.keyboardStyle}>
          <View style={styles.mainContainer}>
            <CHeader navigation={navigation} text={'Home'} menuBtn={true}/>
              <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex: 1}}>
								<List onClick={this.clickFunc} checkFunc={this.changeSelect} data={listData} />
							</KeyboardAwareScrollView>
            <Toast ref="toast" position='top' opacity={0.8} style={styles.toast} textStyle={styles.toastText} fadeInDuration={100} fadeOutDuration={500} />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    
  } 
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
