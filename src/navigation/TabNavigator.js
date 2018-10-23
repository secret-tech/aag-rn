import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import CustomTabNavigation from '../components/common/CustomTabNavigator';

import Explore from '../containers/explore/Explore';
import SubExplore from '../containers/explore/SubExplore';
import AdvisorProfile from '../containers/explore/AdvisorProfile';

import Chat from '../containers/chat/Chat';

import Profile from '../containers/profile/Profile';
import Settings from '../containers/profile/Settings';
import EditProfile from '../containers/profile/EditProfile';
import EditBio from '../containers/profile/EditBio';
import EditTags from '../containers/profile/EditTags';

export default createBottomTabNavigator({
  Explore: createStackNavigator({
    ExploreExplore: { screen: Explore },
    ExploreSubExplore: { screen: SubExplore },
    ExploreAdvisorProfile: { screen: AdvisorProfile }
  }, {
    initialRouteName: 'ExploreExplore',
    headerMode: 'none',
  }),

  Chat: createStackNavigator({
    ChatChat: { screen: Chat }
  }, {
    initialRouteName: 'ChatChat',
    headerMode: 'none'
  }),

  Profile: createStackNavigator({
    ProfileProfile: { screen: Profile },
    ProfileSettings: { screen: Settings },
    ProfileEditProfile: { screen: EditProfile },
    ProfileEditBio: { screen: EditBio },
    ProfileEditTags: { screen: EditTags }
  }, {
    initialRouteName: 'ProfileProfile',
    headerMode: 'none'
  })
}, {
  initialRouteName: 'Explore',
  headerMode: 'none',
  tabBarComponent: CustomTabNavigation
});
