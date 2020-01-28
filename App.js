import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { Provider } from 'react-redux';
import { offlineActionTypes } from 'react-native-offline';

import AppContainer from './src/routers/MainStackRouter';
import configureStore from './src/store/configureStore';
import NavigationService from './src/routers/NavigationService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    this.state.store.dispatch({
      type: offlineActionTypes.CONNECTION_CHANGE,
      payload: isConnected,
    });
  }

  render() {
    if (this.state.isLoading) return null;

    return (
      <Provider store={this.state.store}>
        <AppContainer
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
