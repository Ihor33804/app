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
    };
  }

  componentDidMount() {
    const { token, getSenders, wConnect, getProfileData } = this.props;
    
    if (token) {
      getSenders();
      getProfileData();
      wConnect(token.slice(-(token.length - 4)));
      OneSignal.init(config.one_signal_key, { kOSSettingsKeyInFocusDisplayOption: 0 });
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.inFocusDisplaying(0);
    }
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage) {
      this.refs.toast.show(this.props.errorMessage, 1500, () => {
        this.props.clearError();
      });
    }
    if (prevProps.isRequest !== this.props.isRequest && this.props.isRequest) {
      this.setState({ number: '' });
    }
  }

  onReceived = (notification) => {
    if (notification.isAppInFocus) {
      Alert.alert(
        config.app_name,
        notification.payload.body,
        [
          { text: 'OK', onPress: () => this.onClick(notification) },
        ],
      );
    }
  }

  onClick = (notification) => {
    this.props.navigation.navigate({ routeName: 'messages', params: { uid: notification.payload.additionalData.sender } })
  }

  onOpened = (openResult) => {
    if (!openResult.notification.isAppInFocus) {
      Alert.alert(
        config.app_name,
        openResult.notification.payload.body,
        [
          { text: 'OK', onPress: () => this.onClick(openResult.notification) },
        ],
      );
    }
  }

  clickFunc = (uid) => {
    this.props.navigation.navigate({ routeName: 'userContract', params: { uid }, key: uid });
  }
  
  forSender(){
    return(
      <View style={styles.top}>
      {
        (0>=1) && 
        <View style={styles.listWrap}>
          <List onClick={this.clickFunc} data={[]} />
        </View>
      }
      </View>
    )
  }

  render() {
    const { navigation, senders, role } = this.props;
    const { number } = this.state;
    
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
          contentContainerStyle={styles.keyboardStyle}>
          <View style={styles.mainContainer}>
            <CHeader navigation={navigation} text={'Home'} menuBtn={true}/>
              <View style={styles.top}>
                <Item style={styles.inputWrap} inlineLabel>
                  <Input
                    style={styles.input}
                    placeholder="Введите источник"
                    onChangeText={value => this.setState({ number: value })}
                    value={this.state.number}
                  />
                  {(number) ? (
                    <TouchableOpacity
                      onPress={() => this.setState({ number: '' })}
                    >
                      <Icon style={styles.closeBtn} name='close' />
                    </TouchableOpacity>
                  ) : false}
                </Item>
                {
                  ((role==='executor' && senders.length===0) || role==='RecipientUser') &&
                  <Button
                    rounded
                    style={styles.button}
                    onPress={() => {
                      if (this.state.number) {
                        this.props.update(this.state.number);
                      } else {
                        this.refs.toast.show('Введите источник', 1000);
                      }
                    }}>
                    <Text style={styles.buttonText}>Добавить</Text>
                  </Button>
                }
              {
              (senders.length>=1) && 
              <View style={styles.listWrap}>
                <List onClick={this.clickFunc} data={senders} />
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

UserHome.propTypes = {
  user_id: PropTypes.any,
  token: PropTypes.string,
  errorMessage: PropTypes.any,
  senders: PropTypes.array,
  update: PropTypes.func,
  getSenders: PropTypes.func,
  wConnect: PropTypes.func,
  clearError: PropTypes.func,
  navigation: PropTypes.object,
  isRequest: PropTypes.bool,
};

function mapStateToProps (state) {
  return {
    user_id: state.authReducer.user_id,
    token: state.authReducer.token,
    errorMessage: state.authReducer.error,
    senders: state.userReducer.senders,
    isRequest: state.userReducer.isRequest,
    role: state.authReducer.role
  } 
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    update,
    clearError,
    wConnect,
    getSenders,
    getProfileData
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
