import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { Container, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CHeader from '../../components/header/CHeader';
import CButton from '../../components/button/CButton';
import MessageItem from './components/MessageItem';
import { styles } from './styles';

class Messages extends Component{
	constructor(props) {
    super(props);
    this.state = {
			messages: [
				{
					id: 1,
					label: 'Hello',
					text: 'This is new message',
					image: '',
					type: 'ticket',
					count: 5,
					date: '12.08.2020'
				},{
					id: 2,
					label: 'Hello',
					text: 'This is new messagedddddddddddddddddwejir whriu whruih wruwhuheuh rw wrerhewurhuwehru  werhruwehu',
					image: '',
					type: 'info',
					count: '',
					date: '12.08.2020'
				},{
					id: 3,
					label: 'Hello',
					text: 'This is new message',
					image: '',
					type: 'ticket',
					count: 5,
					date: '12.08.2020'
				},{
					id: 4,
					label: 'Hello',
					text: 'This is new message',
					image: '',
					type: 'ticket',
					count: 0,
					date: '12.08.2020'
				},{
					id: 5,
					label: 'Hello',
					text: 'This is new message',
					image: '',
					type: 'ticket',
					count: 12,
					date: '12.08.2020'
				},{
					id: 6,
					label: 'Hello',
					text: 'This is new message',
					image: '',
					type: 'info',
					count: '',
					date: '12.08.2020'
				},{
					id: 7,
					label: 'Hello',
					text: 'This is new message',
					image: '',
					type: 'ticket',
					count: 3,
					date: '12.08.2020'
				}
			]
    }
	}

	goToNext = (params) =>{
		const { navigation } = this.props;

		navigation.navigate(params);
	}

	render(){
		const { navigation } = this.props;
		const { messages } = this.state;

		return(
			<Container style={styles.container}>
			  <CHeader navigation={navigation} text={'Messages'} backBtn={true} menuBtn={true}/>
			  <TouchableOpacity style={styles.btnLeft} activeOpacity={0.8} onPress={()=>this.goToNext('createTicket')}>
					<Image style={styles.imgBtn} source={require('../../../assets/img/add_image.png')}/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnRight} activeOpacity={0.8} onPress={()=>this.goToNext('info')}>
					<Image style={styles.imgBtn} source={require('../../../assets/img/info.png')}/>
				</TouchableOpacity>
			  <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex: 1}}>
						<View style={styles.content}>
						<FlatList
							data={messages}
							style={{width: '100%'}}
							renderItem={({ item, index }) => 
							<View>
								<MessageItem 
									key={item.id}
									id={item.id}
								  label={item.label} 
								  text={item.text} 
								  onClick={this.goToNext}  
									image={item.image}
									type={item.type}
									count={item.count}
									date={item.date}
								/>
								{
									(index===messages.length-1) &&
									<View style={styles.emptyBlock}/>	
								}
							</View>
							}
							/>
					  </View>
						
				</KeyboardAwareScrollView>	
				
			</Container>
		)
	}
}
function mapStateToProps(state){
	return {
		
	}
};

const mapDispatchToProps = dispatch => bindActionCreators(
	{  }, 
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Messages);