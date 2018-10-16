import React from 'react';
import { createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import SignIn from '../containers/auth/SignIn';
import SignUp from '../containers/auth/SignUp';

const AppNavigator = (props) => {
  const { initialRouteName, screenProps } = props;

  const RootNavigator = createStackNavigator({
    Home: { screen: TabNavigator },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
  }, {
    initialRouteName,
    headerMode: "none"
  });

  return <RootNavigator screenProps={screenProps}/>
};

export default AppNavigator;
