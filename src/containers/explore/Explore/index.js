import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';

import { signOut } from '../../../redux/ducks/auth/auth';

class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Explore</Text>
        <Button onPress={() => this.props.signOut()}>
          <Text>out</Text>
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default connect(null, { signOut })(Explore);
