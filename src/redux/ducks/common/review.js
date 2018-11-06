import { createAction, createAsyncAction, createReducer } from '../../../utils/actions';
import { Map } from 'immutable';

export const OPEN_NOTIFICATION = 'common/review/OPEN_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'common/review/CLOSE_NOTIFICATION';
export const SET_ADVISOR = 'common/review/SET_ADVISOR';
export const PURGE_ADVISOR = 'common/review/PURGE_ADVISOR';
export const SUBMIT_RATING = 'common/review/SUBMIT_RATING';

export const openNotification = createAction(OPEN_NOTIFICATION);
export const closeNotification = createAction(CLOSE_NOTIFICATION);
export const setAdvisor = createAction(SET_ADVISOR);
export const purgeAdvisor = createAction(PURGE_ADVISOR);
export const submitRating = createAsyncAction(SUBMIT_RATING);

const initialState = Map({
  open: false,
  advisor: Map({
    id: '',
    picture: '',
    name: ''
  })
});

export default createReducer({
  [OPEN_NOTIFICATION]: (state, { payload }) => state.merge({
    open: true,
    advisor: Map(payload)
  }),

  [CLOSE_NOTIFICATION]: (state) => state.merge({
    open: false
  }),

  [SET_ADVISOR]: (state, { payload }) => state.merge({
    advisor: Map(payload)
  }),

  [PURGE_ADVISOR]: (state) => state.merge({
    advisor: initialState.get('advisor')
  })
}, initialState);
