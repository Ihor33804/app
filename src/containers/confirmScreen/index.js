import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  Button, Text, Form, Item, Input, Container,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';

import { confirmEmail } from '../../actions/authActions';
import { clearError } from '../../actions/errorActions';
import styles from './styles';

class ConfirmScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmation_code: '',
      // loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    // if (this.props.token && +this.props.confirmationCode.status === 200) {
    //   // this.props.navigation.navigate('home');
    //   this.setState({ loading: false });
    // }
    if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage) {
      // this.setState({ loading: false });
      this.refs.toast.show(this.props.errorMessage, 1500, () => {
        this.props.clearError();
      });
		}
		if (prevProps.token !== this.props.token) {
			this.props.navigation.navigate('home');
		}
  }

	confirmation = () => {
		const { dataUser } = this.props;
		let params = {confirmation_code: this.state.confirmation_code, ...dataUser};
	  this.props.confirmEmail(params);
	  // this.setState({ loading: true });
	}
	componentWillReceiveProps(nextProps){
		if (this.props.token !== nextProps.token) this.props.navigation.navigate('home'); 
	}

	render() {
		const { confirmation_code } = this.state;
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
											keyboardType='numeric'
											maxLength={4}
											placeholder="Код"
											onChangeText={value => this.setState({ confirmation_code: value })}
										/>
									</Item>
									<Text style={styles.smallText}>Если не ввести код в течение 30 минут, он станет недействительным.</Text>
								</Form>
								<View style={styles.btnContainer}>
									<Button
										rounded
										style={styles.button}
										onPress={() => {
										  if (confirmation_code) {
										    this.confirmation();
										  } else {
										    this.refs.toast.show('Введите код подтверждения', 1500);
										  }
										}}>
										<Text style={styles.buttonText}>Отправить</Text>
									</Button>
								</View>
							</View>
						)}
					<Toast ref="toast" opacity={0.8} style={styles.toast} textStyle={styles.toastText} fadeInDuration={100} fadeOutDuration={500} />
				</KeyboardAwareScrollView>
			</Container>
	  );
	}
}

ConfirmScreen.propTypes = {
  token: PropTypes.string,
  confirmEmail: PropTypes.func,
  clearError: PropTypes.func,
  navigation: PropTypes.object,
  errorMessage: PropTypes.any,
  confirmationCode: PropTypes.any,
};

const mapStateToProps = ({ authReducer }) => ({
  token: authReducer.token,
  confirmationCode: authReducer.confirmation_code,
	errorMessage: authReducer.error,
	isRequest: authReducer.isRequest,
	dataUser: authReducer.dataUser,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { confirmEmail, clearError },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen);
