import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import { getToken } from '../../../utils/auth';

class AuthSpinner extends Component {
  constructor(props) {
    super(props);
    this.checkJWT();
  }

  checkJWT = async () => {
    const jwt = await getToken();
    this.props.navigation.navigate(jwt ? 'Home' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthSpinner;