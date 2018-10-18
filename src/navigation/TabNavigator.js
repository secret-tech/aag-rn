import { createBottomTabNavigator } from 'react-navigation';

import Explore from '../containers/explore/Explore';
import Chat from '../containers/chat/Chat';
import Profile from '../containers/profile/Profile';

export default createBottomTabNavigator({
  Explore: { screen: Explore },
  Chat: { screen: Chat },
  Profile: { screen: Profile }
}, {
  initialRouteName: 'Explore',
  headerMode: 'none'
});