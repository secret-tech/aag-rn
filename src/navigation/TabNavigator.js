import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import CustomTabNavigation from '../components/common/CustomTabNavigator';

import Explore from '../containers/explore/Explore';
import AdvisorProfile from '../containers/explore/AdvisorProfile';

import Chat from '../containers/chat/Chat';

import Profile from '../containers/profile/Profile';
import Settings from '../containers/profile/Settings';
import EditProfile from '../containers/profile/EditProfile';
import EditBio from '../containers/profile/EditBio';
import EditTags from '../containers/profile/EditTags';

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
    ProfileSettings: { screen: Settings },
    ProfileEditProfile: { screen: EditProfile },
    ProfileEditBio: { screen: EditBio },
    ProfileEditTags: { screen: EditTags }
  }, {
    initialRouteName: 'SubProfile',
    headerMode: 'none'
  })
}, {
  initialRouteName: 'Explore',
  headerMode: 'none',
  tabBarComponent: CustomTabNavigation
});
