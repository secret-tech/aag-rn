import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import { signIn } from '../../../redux/ducks/auth/auth';

import s from './styles';

const logo = require('../../../assets/images/logo/logoWhite.png');

class SignIn extends Component {
  render() {
    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.loginView}>
          <Image style={s.logo} source={logo}/>

          <View style={s.buttons}>
            <Button block onPress={() => this.props.signIn()}>
              <Text>Sign in with Facebook</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {
    signIn
  }
)(SignIn);
