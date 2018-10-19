import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import CustomTabNavigation from '../components/common/CustomTabNavigator';

import Explore from '../containers/explore/Explore';
import AdvisorProfile from '../containers/explore/AdvisorProfile';

import Chat from '../containers/chat/Chat';

import Profile from '../containers/profile/Profile';
import Settings from '../containers/profile/Settings';

export default createBottomTabNavigator({
  Explore: createStackNavigator({
    SubExplore: { screen: Explore },
    ExploreAdvisorProfile: { screen: AdvisorProfile }
  }, {
    initialRouteName: 'SubExplore',
    headerMode: 'none',
  }),

  Chat: createStackNavigator({
    SubChat: { screen: Chat }
  }, {
    initialRouteName: 'SubChat',
    headerMode: 'none'
  }),

  Profile: createStackNavigator({
    SubProfile: { screen: Profile },
    ProfileSettings: { screen: Settings }
  }, {
    initialRouteName: 'SubProfile',
    headerMode: 'none'
  })
}, {
  initialRouteName: 'Explore',
  headerMode: 'none',
  tabBarComponent: CustomTabNavigation
});
