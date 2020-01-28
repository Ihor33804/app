import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TextInput, Image, TouchableOpacity } from 'react-native';
import { Container, Input, Item, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-native-switch-pro';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CHeader from '../../components/header/CHeader';
import CButton from '../../components/button/CButton';
import List from '../../components/List';
import { styles } from './styles';
import { changePassword } from '../../actions/userActions';

class ChangePass extends Component{
	constructor(props) {
    super(props);
    this.state = {
			infoTicket: false,
			textMessage: '',
			asUser: false,
			openList: false,
			listData: [
				{id: 1, full_name: '1111111111111111111111111111111111111111111111111', check: false}, 
				{id: 2, full_name: '2222222', check: false}, 
				{id: 3, full_name: '33333333', check: false}, 
				{id: 4, full_name: '44444444', check: false}, 
				{id: 5, full_name: '5555555', check: false}
			]
    }
	}
	
	sendMyData = () =>{

	}
	clickFunc = () =>{
		
	}

	changeSelect = (id) =>{
		const { listData } = this.state;
		
    objIndex = listData.findIndex((obj => obj.id == id));
    listData[objIndex].check = !listData[objIndex].check;
		this.setState({listData: listData});
	}

	render(){
		const { navigation, role } = this.props;
		const { infoTicket, textMessage, asUser, openList, listData } = this.state;

		return(
			<Container style={styles.container}>
					<CHeader navigation={navigation} text={'Create ticket'} backBtn={true} menuBtn={true}/>
						<View style={styles.content}>
						  <View style={styles.buttonsWrap}>
								<Button
									rounded
									style={(infoTicket) ? styles.btnUnActive : styles.btnActive}
									onPress={() => this.setState({infoTicket: false})}
								>
									<Text style={styles.smallText}>Заявка</Text>
								</Button>
								{
									(role==='sender') &&
									<Button
										rounded
										style={(infoTicket) ? styles.btnActive : styles.btnUnActive }
										onPress={() => this.setState({infoTicket: true})}
									>
									  <Text style={styles.smallText}>Информация</Text>
								  </Button>
								}
								<TextInput 
									numberOfLines={10}
									multiline={true}
									style={styles.input}
									value={textMessage}
									maxLength={500}
									placeholder={'Текст сообщения...'}
									onChangeText={(text) => this.setState({textMessage: text})}
							  />
								{
									(role==='sender') &&
									<View style={styles.swichWrap}>
										<Switch 
											onSyncPress={() => this.setState({asUser: !asUser})}
											width={35}
											height={20}
											value={asUser}
										/>
										<Text style={styles.swichText}>Создать от имени пользователя</Text>
								  </View>
								}
								
								{
									(role==='sender') &&
									<TouchableOpacity activeOpacity={0.8} style={styles.swichWrap} onPress={()=>this.setState({openList: !openList})}>
										<Text style={styles.swichText}>Добавить исполнителя</Text>
										<Image style={[styles.img, {transform: [{ rotate: (openList) ? '180deg' : '0deg' }]}]} source={require('../../../assets/img/icon_up_down.png')}/>
								  </TouchableOpacity>
								}
								{
									(openList) &&
									<View style={styles.listWrap}>
										<KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
											<List onClick={this.clickFunc} checkFunc={this.changeSelect} data={listData} />
										</KeyboardAwareScrollView>
									</View>	
								}
							</View>
							<View style={styles.btnWrap}>
								<CButton text={'Отправить'} onClick={this.sendMyData} />
							</View>
					  </View>
			</Container>
		)
	}
}
function mapStateToProps(state){
	return {
		role: state.authReducer.role
	}
};

const mapDispatchToProps = dispatch => bindActionCreators(
	{  }, 
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);