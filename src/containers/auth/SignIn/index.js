import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

export default class SignIn extends Component {
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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Sign In</Text>
        <Button title="call mark" onPress={this.signIn}/>
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
