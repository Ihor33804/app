import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  Button, Text, Input, Item, Icon, Container,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import CHeader from '../../components/header/CHeader';

import config from '../../config';
import List from '../../components/List';
import { getContracts, addContract } from '../../actions/userActions';

class UserContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
    };
  }

  componentDidMount() {
    this.props.getContracts(this.props.navigation.state.params.uid)
  }

  clickFunc = (uid) => {
    this.props.navigation.navigate('messages');
  }

  render() {
		const { navigation, role, contracts } = this.props;
		const { number } = this.state;
    
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
          contentContainerStyle={styles.keyboardStyle}>
          <View style={styles.mainContainer}>
            <CHeader navigation={navigation} text={'Отправитель'} backBtn={true} menuBtn={true}/>
            <View style={styles.top}>
              <Item style={styles.inputWrap} inlineLabel>
								<Input
										style={styles.input}
										placeholder="Введите номер договора"
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
								<Button
										rounded
										style={styles.button}
										onPress={() => {
										if (this.state.number) {
                        this.props.addContract({sender_id: this.props.navigation.state.params.uid, contract: number})
										} else {
												this.refs.toast.show('Введите номер договора', 1000);
										}
										}}>
										<Text style={styles.buttonText}>Добавить</Text>
								</Button>
						{
						(contracts.length>=1) && 
						<View style={styles.listWrap}>
								<List onClick={this.clickFunc} data={contracts} />
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

function mapStateToProps (state) {
  return {
    contracts: state.userReducer.contracts,
    isRequest: state.userReducer.isRequest,
  } 
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getContracts,
    addContract
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserContract);
