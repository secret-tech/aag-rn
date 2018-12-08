import { combineReducers } from 'redux';

import { navReducer } from '../navigation/AppNavigator';

import auth from './ducks/auth/auth';

import socket from './ducks/common/socket';
import review from './ducks/common/review';

import profile from './ducks/profile/profile'
import editBio from './ducks/profile/editBio';
import editTags from './ducks/profile/editTags';

import explore from './ducks/explore/explore';
import subExplore from './ducks/explore/subExplore';

import rooms from './ducks/chat/rooms';
import chat from './ducks/chat/chat';
import call from './ducks/chat/call';

export default combineReducers({
  nav: navReducer,
  
  auth: combineReducers({
    auth
  }),

  common: combineReducers({
    socket,
    review
  }),

  profile: combineReducers({
    profile,
    editBio,
    editTags
  }),

  explore: combineReducers({
    explore,
    subExplore
  }),

  chat: combineReducers({
    rooms,
    chat,
    call
  })
});
