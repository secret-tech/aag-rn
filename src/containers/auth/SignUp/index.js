import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import { fetchFbUserData } from '../../../redux/ducks/auth/auth';

import s from './styles';

const logo = require('../../../assets/images/logo/logoWhite.png');

class SignUp extends Component {
  render() {
    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.loginView}>
          <Image style={s.logo} source={logo}/>

          <View style={s.buttons}>
            <Button block onPress={() => console.log('u picked the role!')}>
              <Text>pick the role</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth
  }),
  {
    fetchFbUserData
  }
)(SignUp);
