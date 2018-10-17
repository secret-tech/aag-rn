import { combineReducers } from 'redux-immutable';

import counter from './ducks/counter';

import auth from './ducks/auth/auth';

export default combineReducers({
  counter,
  auth
});