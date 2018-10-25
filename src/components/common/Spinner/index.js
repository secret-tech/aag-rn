import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import s from './styles';

const Spinner = () => {
  return (
    <View style={s.spinner}>
      <ActivityIndicator size="large" color="#6546fa"/>
    </View>
  );
};

export default Spinner;