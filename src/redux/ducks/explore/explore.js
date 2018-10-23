import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map, List } from 'immutable';

export const FETCH_ADVISOSRS = 'explore/explore/FETCH_ADVISOSRS';

export const fetchAdvisors = createAsyncAction(FETCH_ADVISOSRS);

const initialState = Map({
  loading: false,
  data: List()
});

export default createReducer({
  [fetchAdvisors.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [fetchAdvisors.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    data: List(payload)
  }),

  [fetchAdvisors.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
