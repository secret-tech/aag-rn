import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { signOut } from '../../../redux/ducks/auth/auth';

import Explorer from '../../../components/explore/Explorer';

const ADVISORS = [
  { name: 'name 1' },
  { name: 'name 2' },
  { name: 'name 3' },
  { name: 'name 4' }
];

class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Explorer advisors={ADVISORS}/>
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
