import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

const s = StyleSheet.create({
  margin: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  }
});

export default (props) => (
  <View style={s.margin}>
    {props.children}
  </View>
);