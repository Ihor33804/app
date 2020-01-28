import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TextInput, Image, TouchableOpacity } from 'react-native';
import { Badge } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styles } from './styles';

class MessageItem extends Component{

	render(){
		const { 
			id,
			label,
			text, 
			onClick, 
			image,
			type,
			count,
			date
		} = this.props;

		return(
			<View style={styles.container}>
				<View style={styles.imgWrap}>
				<Image style={styles.img} source={(image) ? {uri: image} : require('../../../../assets/img/ava.png')}/>
				</View>
				<View style={styles.content}>
					<Text style={styles.mainText}>{label}</Text>
					<Text style={styles.messageText}>{text}</Text>
					<Text style={styles.date}>{date}</Text>
					{
						(type!=='info') &&
						<TouchableOpacity activeOpacity={0.8} style={styles.btn}>
						  <Text style={styles.btnText}>{'Чат >'}</Text>
					  </TouchableOpacity>
					}
				</View>
				{
					(count > 0) && (
						<Badge style={styles.badge}>
							<Text style={styles.badgeText}>{count}</Text>
						</Badge>
					)
				}
		  </View>
		)
	}
}


export default MessageItem;