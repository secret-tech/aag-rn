import { createStackNavigator } from 'react-navigation';

import SignIn from '../containers/auth/SignIn';
import SignUp from '../containers/auth/SignUp';

export default createStackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
}, {
  initialRouteName: 'SignUp',
  headerMode: 'none'
});