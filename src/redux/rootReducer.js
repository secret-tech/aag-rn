import { combineReducers } from 'redux';

import { navReducer } from '../navigation/AppNavigator';

import counter from './ducks/counter';

import auth from './ducks/auth/auth';

export default combineReducers({
  nav: navReducer,
  counter,
  auth
});