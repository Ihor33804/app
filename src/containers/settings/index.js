import React, { Component } from 'react';
import { View, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { Container, Input, Item } from 'native-base';
import PhotoUpload from 'react-native-photo-upload';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CHeader from '../../components/header/CHeader';
import CButton from '../../components/button/CButton';
import { styles } from './styles';
import { editProfile } from '../../actions/authActions';

class Settings extends Component{
	constructor(props) {
    super(props);
    this.state = {
			data: {
				...props.profileData
			},
    }
	}

	// componentDidMount(){
	// 	this.props.getProfileData();
	// }

	sendMyData = () =>{
		
		const { data } = this.state;
		const { navigation, profileData } = this.props;
		// const profileData = {first_name: '', last_name: '', image: ''}
		const arr = [];

		for (var key1 in data){
			for (var key2 in profileData){
				(key1===key2) ? 
				(data[key1]!==profileData[key2] && key1 !== 'image') ? arr.push({name: key1, data: String(data[key1])}) : 
				(data[key1]!==profileData[key2] && key1 === 'image') ? arr.push({name: key1, data: String(data[key1]), filename: 'photo.png'}) : null : null
			}
		};
		if (arr.length>=1) this.props.editProfile(arr);
	}

	render(){
		const { navigation, isRequest } = this.props;
		const { data } = this.state;
		const { image, first_name, last_name } = data;
		
		return(
			<Container style={styles.container}>
			  <KeyboardAwareScrollView
				  keyboardShouldPersistTaps='handled'>
					<CHeader navigation={navigation} text={'Settings'} backBtn={true} menuBtn={true}/>
					{
						(!isRequest) ?
						<View style={styles.content}>
							<View style={styles.photoBlock}>
								<PhotoUpload
									imagePickerProps={{
										title: 'Выберите фото', 
										cancelButtonTitle: 'Отмена',
										takePhotoButtonTitle: 'Сделать фото',
										chooseFromLibraryButtonTitle: 'Выбрать с галереи'
									}}
									containerStyle={styles.photoWrap}
									onPhotoSelect={avatar => { this.setState(prevState => ({data: {...prevState.data, image: avatar}}))}}
								>
								<Image
									style={styles.photo}
									resizeMode='cover'
									source={
										(image) ? {uri:  image} : require('../../../assets/img/add_image.png')
									}
								/>
								<Text style={styles.textPhoto}>Фото пользователя</Text>
								</PhotoUpload> 
							</View>
							<View style={styles.inputsBlock}> 
							  <Item style={styles.inputWrap} inlineLabel>
									<Input
										style={styles.input}
										placeholder="Ваше имя"
										onChangeText={(text)=>this.setState(prevState => ({data: {...prevState.data, first_name: text}}))}
										value={first_name}
									/>
								</Item>
								<Item style={styles.inputWrap} inlineLabel>
							  <Input
                  style={styles.input}
                  placeholder="Ваша фамилия"
                  onChangeText={(text)=>this.setState(prevState => ({data: {...prevState.data, last_name: text}}))}
                  value={last_name}
                />
								</Item>
						  </View>
							<View style={styles.btnWrap}>
								<CButton text={'Сохранить'} onClick={this.sendMyData} />
							</View>
					  </View> :
					  <ActivityIndicator size="large" color='#ef7f1a' />
					}
				</KeyboardAwareScrollView>
			</Container>
		)
	}
}

const mapStateToProps = ({ authReducer }) => ({
	profileData: authReducer.profileData,
	isRequest: authReducer.isRequest
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { editProfile },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);