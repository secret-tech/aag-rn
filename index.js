import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import AppNavigator from './src/navigation/AppNavigator';

class App extends Component {
  render() {
    return (
      <AppNavigator initialRouteName="Home" />
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
