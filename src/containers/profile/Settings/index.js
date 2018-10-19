import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { signOut } from '../../../redux/ducks/auth/auth';

class Settings extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings</Text>
        <Button onPress={() => this.props.signOut()}>
          <Icon name='emotsmile' size={30} color='#b22' />
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

export default connect(null, { signOut })(Settings);
