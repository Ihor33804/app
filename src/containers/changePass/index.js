import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Input, Item } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import CHeader from '../../components/header/CHeader';
import CButton from '../../components/button/CButton';
import { styles } from './styles';
import { changePassword } from '../../actions/userActions';

class ChangePass extends Component{
	constructor(props) {
    super(props);
    this.state = {
			password: '',
      validPassword: '',
      newPassword: '', 
      validNewPassword: '',
      confNewPassword: '', 
      confValidNewPassword: ''
    }
	}

	changePassFunc = () =>{
		const {validPassword, validNewPassword, confValidNewPassword } = this.state;

		console.log(validPassword, validNewPassword, confValidNewPassword);

		let params = {
			old_password: validPassword, 
			new_password: validNewPassword
		};
		
		if(validPassword!==null && validPassword!=='' && validNewPassword!==null && validNewPassword!=='' && confValidNewPassword!==null && confValidNewPassword!== ''){
			if (validNewPassword === confValidNewPassword) {
				console.log('good');
				this.props.changePassword(params);
			} else {
				this.refs.toast.show("Новый пароль не совпадает", 1500);
			}
    } else {
			this.refs.toast.show('Вы неправильно заполнили одно или несколько полей', 1500);
		}
	}
	

	blureFunc = (value, type) =>{
		if (value.length>=6) {
			this.setState({[type]: value});
		} else {
			this.setState({[type]: null});
		}
	}

	render(){
		const { navigation } = this.props;
		const { password, newPassword, confNewPassword } = this.state;

		return(
			<Container style={styles.container}>
					<CHeader navigation={navigation} text={'Change password'} backBtn={true} menuBtn={true}/>
						<View style={styles.content}>
							<View style={styles.inputsBlock}> 
							  <Item style={styles.inputWrap} inlineLabel>
									<Input
									  secureTextEntry={true}
										style={styles.input}
										placeholder="Старый пароль"
										onChangeText={(value)=> this.setState({password: value})} 
                    onBlur={()=>this.blureFunc(password, 'validPassword')}
										value={password}
									/>
								</Item>
								<Item style={styles.inputWrap} inlineLabel>
									<Input
									  secureTextEntry={true}
										style={styles.input}
										placeholder="Новый пароль"
										onChangeText={(value)=> this.setState({newPassword: value})}
                    onBlur={()=>this.blureFunc(newPassword, 'validNewPassword')}
										value={newPassword}
									/>
								</Item>
								<Item style={styles.inputWrap} inlineLabel>
							  <Input
								  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Подтвердите пароль"
                  onChangeText={(value)=> this.setState({confNewPassword: value})} 
                  onBlur={()=>this.blureFunc(confNewPassword, 'confValidNewPassword')}
                  value={confNewPassword}
                />
								</Item>
						  </View>
							<View style={styles.btnWrap}>
								<CButton text={'Изменить пароль'} onClick={this.changePassFunc} />
							</View>
					  </View>
						<Toast ref="toast" opacity={0.8} position='top' style={styles.toast} textStyle={styles.toastText} fadeInDuration={100} fadeOutDuration={500} /> 
			</Container>
		)
	}
}
const mapStateToProps = ({homeActions}) =>({
	
});

const mapDispatchToProps = dispatch => bindActionCreators(
	{ changePassword }, 
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);