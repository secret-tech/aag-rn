import { createAsyncAction, createAction, createReducer } from '../../../utils/actions';

export const FETCH_SUB_ADVISORS = 'explore/subExplore/FETCH_SUB_ADVISORS';
export const PURGE_SUB_ADVISORS = 'explore/subExplore/PURGE_SUB_ADVISORS';

export const fetchSubAdvisors = createAsyncAction(FETCH_SUB_ADVISORS);
export const purgeSubAdvisors = createAction(PURGE_SUB_ADVISORS);

const initialState = {
  loading: false,
  data: []
};

export default createReducer({
  [fetchSubAdvisors.REQUEST]: (state) => ({
    ...state,
    loading: true
  }),

  [fetchSubAdvisors.SUCCESS]: (state, { payload }) => {
    return ({
      loading: false,
      data: [...state.data, ...payload.data]
    });
  },

  [fetchSubAdvisors.FAILURE]: (state) => ({
    ...state,
    loading: false
  }),

  [PURGE_SUB_ADVISORS]: () => initialState
}, initialState);
