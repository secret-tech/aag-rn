import { combineReducers } from 'redux-immutable';

import counter from './ducks/counter';

export default combineReducers({
  counter
});