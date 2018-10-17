import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import { incrementCounter, decrementCounter } from '../../../redux/ducks/counter';

class SignIn extends Component {
  signIn = () => {
    LoginManager.logInWithReadPermissions(["public_profile", "email", "user_birthday", "user_friends"])
      .then(
        (result) => {
          console.log('result', result);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Sign In</Text>
        <Button title="call mark" onPress={this.signIn}/>

        <View style={{ flex: 1 }}>
          <Button title="+" onPress={() => this.props.incrementCounter()}/>
          <Text>{this.props.counterNum}</Text>
          <Button title="-" onPress={() => this.props.decrementCounter()}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default connect(
  (state) => ({
    counterNum: state.get('counter').get('num')
  }),
  {
    incrementCounter,
    decrementCounter
  }
)(SignIn);
