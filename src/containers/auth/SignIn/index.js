import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';

import { fetchFbUserData } from '../../../redux/ducks/auth/auth';

class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Sign In</Text>
        <Button block onPress={() => this.props.fetchFbUserData()}>
          <Text>Call Facebook</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6546fa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
});

export default connect(
  (state) => ({
    authorized: state.get('auth').get('authorized'),
    jwt: state.get('auth').get('jwt'),
    loading: state.get('auth').get('loading'),
    fbUserData: {
      ageRange: state.get('auth').get('fbUserData').get('ageRange'),
      birthday: state.get('auth').get('fbUserData').get('birthday'),
      email: state.get('auth').get('fbUserData').get('email'),
      firstName: state.get('auth').get('fbUserData').get('firstName'),
      lastName: state.get('auth').get('fbUserData').get('lastName'),
      name: state.get('auth').get('fbUserData').get('name'),
      id: state.get('auth').get('fbUserData').get('id'),
      picture: state.get('auth').get('fbUserData').get('picture')
    }
  }),
  {
    fetchFbUserData
  }
)(SignIn);
