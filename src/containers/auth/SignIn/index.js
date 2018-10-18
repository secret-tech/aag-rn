import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import { fetchFbUserData } from '../../../redux/ducks/auth/auth';

import s from './styles';

const logo = require('../../../assets/images/logo/logoWhite.png');

class SignIn extends Component {
  render() {
    console.log('signin props', this.props);
    
    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.loginView}>
          <Image style={s.logo} source={logo}/>

          <View style={s.buttons}>
            <Button block onPress={() => this.props.fetchFbUserData()}>
              <Text>Sign in with Facebook</Text>
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
)(SignIn);
