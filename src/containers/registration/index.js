import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  Button, Text, Form, Item, Input, Container,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInputMask } from 'react-native-masked-text';
import Toast from 'react-native-easy-toast';

import { singUp } from '../../actions/authActions';
import { clearError } from '../../actions/errorActions';
import styles from './styles';

class RegistrationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword: '',
      formattedPhone: '',
      phone: '',
      email: '',
      emailValid: false,
      parolValid: true,
			user: true
    };
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.token !== this.props.token) { this.props.navigation.navigate('confirm'); this.setState({ loading: false }); }
    if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage) {
      this.refs.toast.show(this.props.errorMessage, 1500, () => {
        this.props.clearError();
      });
    }
  }

	regiserFunc = () => {
		const phone = this.phoneField.getRawValue();
		const type = (this.state.user) ? 'RecipientUser' : 'Executor';
	  this.props.singUp(this.state.email, phone, this.state.password, type);
	}

	register = () => {
	  if (this.state.email && this.state.parolValid && this.state.emailValid) {
	    this.regiserFunc();
	  } else {
	    this.refs.toast.show('Вы неправильно заполнили одно или несколько полей', 1000);
	  }
	}

	validEmail = (text) => {
	  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	  this.setState({ email: text });

	  if (!reg.test(text)) {
	    this.setState({ emailValid: false });
	    this.refs.toast.show('Введите правильный Email', 1000);
	    return false;
	  }
	  this.setState({ emailValid: true });
	  return true;
	}

	checkNewPasswords(val) {
		const { confirmPassword } = this.state;

	  if (val && confirmPassword && val
			=== confirmPassword && val.length >= 6) {
	    this.setState({ parolValid: true });
	  } else {
	    this.setState({ parolValid: false });
	    this.refs.toast.show('Пароли не совпадают', 500);
	  }
	}
	
	checkConfirmedPasswords(val) {
		const { password } = this.state;

	  if (password && val && password
			=== val && password.length >= 6) {
	    this.setState({ parolValid: true });
	  } else {
	    this.setState({ parolValid: false });
	    this.refs.toast.show('Пароли не совпадают', 500);
	  }
	}

	render() {
		const { parolValid, formattedPhone, loading, user } = this.state;
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
										<TextInputMask
											type={'cel-phone'}
											options={{
											  maskType: 'BRL',
											  withDDD: true,
											  dddMask: '+7 (999) 999 99 99',
											  getRawValue(value) {
											    return value;
											  },
											}}
											value={formattedPhone}
											onChangeText={(text) => {
											  this.setState({ formattedPhone: text });
											}}
											maxLength={18}
											keyboardType='number-pad'
											style={styles.inputContainer}
											placeholder="+7 (000) 000 00 00"
											ref={ref => this.phoneField = ref}
										/>
									</Item>
									<Item style={styles.inputWrap} inlineLabel>
										<Input
											style={styles.inputContainer}
											placeholder="E-mail"
											autoCapitalize='none'
											onChangeText={text => this.validEmail(text)}
										/>
									</Item>
									<Item style={styles.inputWrap} inlineLabel error={!parolValid}>
										<Input
											secureTextEntry={true}
											style={styles.inputContainer}
											placeholder="Пароль"
											onChangeText={(value) => {
												this.setState({ password: value });
												this.checkNewPasswords(value);
											}}
										/>
									</Item>
									<Item style={styles.inputWrap} inlineLabel error={!parolValid}>
										<Input
											secureTextEntry={true}
											style={styles.inputContainer}
											placeholder="Подтвердить пароль"
											onChangeText={(value) => {
												this.setState({ confirmPassword: value });
												this.checkConfirmedPasswords(value);
											}}
										/>
									</Item>
									<Text style={styles.smallText}>Минимальная длина пароля 6 символов</Text>
								</Form>
								<View style={styles.buttonsWrap}>
									<Button
										rounded
										style={(user) ? styles.btnActive : styles.btnUnActive}
										onPress={() => this.setState({user: true})}
									>
										<Text style={styles.smallText}>Пользователь</Text>
									</Button>
									<Button
										rounded
										style={(user) ? styles.btnUnActive : styles.btnActive }
										onPress={() => this.setState({user: false})}
									>
										<Text style={styles.smallText}>Исполнитель</Text>
									</Button>
								</View>
								<View style={styles.btnContainer}>
									<Button
										rounded
										style={styles.button}
										onPress={() => this.register()}
									>
										<Text style={styles.buttonText}>Зарегистрироваться</Text>
									</Button>
								</View>
								<View style={styles.bottomText}>
									<Text style={styles.fontBottomText}>Уже есть учетная запись?</Text>
									<TouchableOpacity
										onPress={() => {
										  this.props.navigation.navigate('authorization');
										}}
									>
										<Text style={styles.btnLink}>Вход</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					<Toast ref="toast" opacity={0.8} style={styles.toast} textStyle={styles.toastText} fadeInDuration={100} fadeOutDuration={500} />
				</KeyboardAwareScrollView>
			</Container>
	  );
	}
}

RegistrationScreen.propTypes = {
  token: PropTypes.string,
  errorMessage: PropTypes.any,
  singUp: PropTypes.func,
  clearError: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = ({ authReducer }) => ({
  token: authReducer.token,
	errorMessage: authReducer.error,
	isRequest: authReducer.isRequest,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { singUp, clearError },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
