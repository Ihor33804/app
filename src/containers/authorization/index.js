import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  Button, Text, Form, Item, Input, Container,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';

import { singIn } from '../../actions/authActions';
import { clearError } from '../../actions/errorActions';
import styles from './styles';

class AuthorizationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      phone: '',
      email: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.props.navigation.navigate('home');
    }
    if (this.props.errorMessage && this.props.errorMessage.payload && prevProps.errorMessage !== this.props.errorMessage) {
      this.refs.toast.show(this.props.errorMessage.payload.data.error, 1500, () => {
        this.props.clearError();
      });
    }
	}
	
	componentWillReceiveProps(nextProps){
		if (this.props.token !== nextProps.token) this.props.navigation.navigate('home'); 
	}

  authCheck(value) {
    if (this.validPhone(value)) {
      this.setState({ phone: value, email: '' });
    } else if (this.validMail(value)) {
      this.setState({ email: value, phone: '' });
    } else {
      false;
    }
  }

	authhorization = () => {
	  this.props.singIn(this.state.email, this.state.phone, this.state.password);
	}

	validPhone = (value) => {
	  const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	  return reg.test(value) !== false;
	}

	validMail = (value) => {
	  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return reg.test(value) !== false;
	}

	render() {
	  const { phone, email, password } = this.state;
		const { isRequest } = this.props;
	  return (
			<Container style={styles.container}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps='handled'
					style={{ flex: 1 }}
					contentContainerStyle={styles.keyboardStyle}>
					{(isRequest) && <ActivityIndicator size="large" color='#ef7f1a' />}
					{
						(!isRequest) && (
							<View style={styles.mainContainer}>
								<View style={styles.logoWrap}>
									<Text style={styles.logoLetter}>e</Text>
									<Text style={styles.logoText}>-Komekshi</Text>
								</View>
								<Form style={styles.form}>
									<Item style={styles.inputWrap} inlineLabel>
										<Input
											style={styles.inputContainer}
											placeholder="E-mail или телефон"
											autoCapitalize='none'
											onChangeText={value => this.authCheck(value)}
										/>
									</Item>
									<Item style={styles.inputWrap} inlineLabel>
										<Input
											secureTextEntry={true}
											style={styles.inputContainer}
											placeholder="Пароль"
											onChangeText={value => this.setState({ password: value })}
										/>
									</Item>
								</Form>
								<View style={styles.btnContainer}>
									<Button
										rounded
										style={styles.button}
										onPress={() => {
										  if ((phone || email) && password) {
										    this.authhorization();
										  } else {
										    this.refs.toast.show('Вы неправильно заполнили одно или несколько полей', 1500);
										  }
										}}>
										<Text style={styles.buttonText}>Войти</Text>
									</Button>
								</View>
								<View style={styles.bottomText}>
									<Text style={styles.fontBottomText}>Еще нет учетной записи?</Text>
									<TouchableOpacity
										onPress={() => {
										  this.props.navigation.navigate('registration');
										}}><Text style={styles.btnLink}>Регистрация</Text></TouchableOpacity>
								</View>
							</View>
						)}
					<Toast ref="toast" opacity={0.8} position='top' style={styles.toast} textStyle={styles.toastText} fadeInDuration={100} fadeOutDuration={500} />
				</KeyboardAwareScrollView>
			</Container>
	  );
	}
}

AuthorizationScreen.propTypes = {
  token: PropTypes.string,
  errorMessage: PropTypes.any,
  singIn: PropTypes.func,
  clearError: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = ({ authReducer }) => ({
  token: authReducer.token,
  errorMessage: authReducer.error,
  isRequest: authReducer.isRequest,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { singIn, clearError },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);
