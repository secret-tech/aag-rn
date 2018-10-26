import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/configureStore';
import { name as appName } from './app.json';

import AppNavigator from './src/navigation/AppNavigator';

class App extends Component {
  render() {
    console.log('hello world');
    
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
