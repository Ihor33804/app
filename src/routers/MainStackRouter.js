import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Text } from 'native-base';

import configureStore from '../store/configureStore';
import { singOut } from '../actions/authActions';
import { wDisconnect } from '../actions/notificationAction';
import HomeScreen from '../containers/home';
import UserHomeScreen from '../containers/userHome';
import UserContractScreen from '../containers/userContract';
import SenderHomeScreen from '../containers/senderHome';
import SenderNextScreen from '../containers/senderNext';
import AuthorizationScreen from '../containers/authorization';
import RegistrationScreen from '../containers/registration';
import ConfirmScreen from '../containers/confirmScreen';
import MessagesScreen from '../containers/messages';
import StageScreen from '../containers/stageScreen';
import { ORANGE } from '../styles/constants';
import SettingsScreen from '../containers/settings';
import Menu from '../components/menu/Menu';
import ChangePassScreen from '../containers/changePass';
import createTicketScreen from '../containers/cteateTicket';

const store = configureStore();

const MainScreenNavigator = createStackNavigator({
  
  userHome: {
    screen: UserHomeScreen,
    navigationOptions: {
      header: null,
    },
    // navigationOptions: ({ navigation }) => ({
    //   title: 'Добро пожаловать',
    //   headerTintColor: '#fff',
    //   headerStyle: {
    //     backgroundColor: ORANGE,
    //     textAlign: 'left',
    //   },
    //   headerRight: (
    //     <Button transparent style={{ alignSelf: 'center' }} dark onPress={() => {
    //       store.dispatch(wDisconnect());
    //       store.dispatch(singOut());
    //       navigation.navigate('authorization');
    //     }}>
    //       <Icon style={{ color: '#fff' }} name='log-out' />
    //       <Text style={{ color: '#fff', paddingLeft: 0, fontWeight: '600' }}>Выйти</Text>
    //     </Button>
    //   ),
    // }),
  },
  userContract: {
    screen: UserContractScreen,
    navigationOptions: {
      header: null,
    },
  },
  senderHome: {
    screen: SenderHomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  senderNext: {
    screen: SenderNextScreen,
    navigationOptions: {
      header: null,
    },
  },
  settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: null,
    },
  },
  changePass: {
    screen: ChangePassScreen,
    navigationOptions: {
      header: null,
    },
  },
  createTicket: {
    screen: createTicketScreen,
    navigationOptions: {
      header: null,
    },
  },
  messages: {
    screen: MessagesScreen,
    navigationOptions: {
      header: null,
    },
    // navigationOptions: ({ navigation }) => ({
    //   title: 'Уведомления',
    //   headerTintColor: '#fff',
    //   headerStyle: {
    //     backgroundColor: ORANGE,
    //     textAlign: 'left',
    //   },
    //   headerLeft:
    //     <Button transparent style={{ alignSelf: 'center' }} dark onPress={() => { navigation.goBack(); }}>
    //       <Icon style={{ color: '#fff' }} name='arrow-back' />
    //     </Button>,
    //   headerRight:
    //     <Button transparent style={{ alignSelf: 'center' }} dark onPress={() => {
    //       store.dispatch(wDisconnect());
    //       store.dispatch(singOut());
    //       navigation.navigate('authorization');
    //     }}>
    //       <Icon style={{ color: '#fff' }} name='log-out' />
    //       <Text style={{ color: '#fff', paddingLeft: 0, fontWeight: '600' }}>Выйти</Text>
    //     </Button>,
    // }),
  },
});

const Authorization = createStackNavigator({
  authorization: {
    screen: AuthorizationScreen,
    navigationOptions: {
      header: null,
    },
  },
  registration: {
    screen: RegistrationScreen,
    navigationOptions: {
      header: null,
    },
  },
  confirm: {
    screen: ConfirmScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const Stage = createStackNavigator({
  stageScreen: {
    screen: StageScreen,
    navigationOptions: {
      header: null,
    },
  },
  home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const MyDrawerNavigator  = createDrawerNavigator(
  { 
    MainScreenNavigator 
  },
  {
    contentComponent: Menu,
    drawerWidth: 300
  }
)

const AppNavigator = createSwitchNavigator({
  Stage,
  Auth: Authorization,
  MyDrawerNavigator
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
