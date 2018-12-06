import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map, List } from 'immutable';

export const FETCH_ADVISOSRS = 'explore/explore/FETCH_ADVISOSRS';

export const fetchAdvisors = createAsyncAction(FETCH_ADVISOSRS);

const initialState = Map({
  loading: false,
  newAdvisors: List(),
  featuredAdvisors: List(),
  onlineAdvisors: List()
});

export default createReducer({
  [fetchAdvisors.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [fetchAdvisors.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    newAdvisors: List(payload.new),
    onlineAdvisors: List(payload.online),
    featuredAdvisors: List(payload.featured)
  }),

  [fetchAdvisors.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
