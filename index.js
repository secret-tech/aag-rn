import React, { Component } from 'react';
import { AppRegistry, View, Button } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';

import configureStore from './src/redux/configureStore';
import { name as appName } from './app.json';

class App extends Component {
  state = {
    initialRouteName: 'SignIn',
    isLoggedIn: false,
    fetching: false
  }

  signIn = () => {
    this.setState({
      initialRouteName: 'Home',
      isLoggedIn: true,
      fetching: false
    });
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <AppNavigator initialRouteName={this.state.initialRouteName} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
