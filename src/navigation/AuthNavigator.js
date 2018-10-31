import { createStackNavigator } from 'react-navigation';

import SignIn from '../containers/auth/SignIn';

export default createStackNavigator({
  SignIn: { screen: SignIn }
}, {
  initialRouteName: 'SignIn',
  headerMode: 'none'
});