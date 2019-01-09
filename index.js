import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal';

import './src/utils/socketService';
import store from './src/redux/configureStore';
import { name as appName } from './app.json';

import AppNavigator from './src/navigation/AppNavigator';

class App extends Component {
  componentWillMount() {
    console.disableYellowBox = true;
    
    OneSignal.setLogLevel(7, 0);
    OneSignal.init('96ef2fff-208d-4b7e-a592-6c45b3633fad', { kOSSettingsKeyAutoPrompt: true });
    OneSignal.inFocusDisplaying(0);

    OneSignal.addEventListener('received', (n) => console.log('received', n));
    OneSignal.addEventListener('opened', (n) => console.log('opened', n));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigator/>
        </Root>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
