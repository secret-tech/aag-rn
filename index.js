import React, { Component } from 'react';
import { AppRegistry, View, Button } from 'react-native';
import { name as appName } from './app.json';

import AppNavigator from './src/navigation/AppNavigator';

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
    console.log(this.state);
    return (
      <AppNavigator initialRouteName={this.state.initialRouteName} />
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
