import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import { signUp } from '../../../redux/ducks/auth/auth';

import withBack from '../../../hoc/AnroidBackHandler';

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
              <Button 
                block
                light
                bordered
                onPress={() => this.props.signUp('advisor')}>
                <Text>Sign Up as Advisor</Text>
              </Button>
            </View>
            
            <View style={s.button}>
              <Button
                block
                light
                bordered
                onPress={() => this.props.signUp('user')}>
                <Text>Sign Up as User</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const ComponentWithBack = withBack(SignUp);

export default connect(
  null,
  {
    signUp
  }
)(ComponentWithBack);
