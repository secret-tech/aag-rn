import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map, List } from 'immutable';

export const FETCH_SUB_ADVISORS = 'explore/subExplore/FETCH_SUB_ADVISORS';

export const fetchSubAdvisors = createAsyncAction(FETCH_SUB_ADVISORS);

const initialState = Map({
  loading: false,
  data: List()
});

export default createReducer({
  [fetchSubAdvisors.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [fetchSubAdvisors.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    data: List(payload)
  }),

  [fetchSubAdvisors.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
