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
            <View style={s.button}>
              <Button block light bordered onPress={() => console.log('SIGN_UP AS PROVIDER')}>
                <Text>Sign Up as Adviser</Text>
              </Button>
            </View>
            
            <View style={s.button}>
              <Button block light bordered onPress={() => console.log('SIGN_UP AS USER')}>
                <Text>Sign Up as User</Text>
              </Button>
            </View>
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
