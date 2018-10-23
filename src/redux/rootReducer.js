import { combineReducers } from 'redux';

import { navReducer } from '../navigation/AppNavigator';

import counter from './ducks/counter';

import auth from './ducks/auth/auth';

import profile from './ducks/profile/profile'
import editBio from './ducks/profile/editBio';
import editTags from './ducks/profile/editTags';

import explore from './ducks/explore/explore';
import subExplore from './ducks/explore/subExplore';

export default combineReducers({
  nav: navReducer,
  counter,
  
  auth: combineReducers({
    auth
  }),

  profile: combineReducers({
    profile,
    editBio,
    editTags
  }),

  explore: combineReducers({
    explore,
    subExplore
  })
});
