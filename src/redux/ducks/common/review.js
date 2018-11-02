import { createAction, createReducer } from '../../../utils/actions';
import { Map } from 'immutable';

export const OPEN_NOTIFICATION = 'common/review/OPEN_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'common/review/CLOSE_NOTIFICATION';

export const openNotification = createAction(OPEN_NOTIFICATION);
export const closeNotification = createAction(CLOSE_NOTIFICATION);

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
    open: false,
    advisor: initialState.get('advisor')
  })
}, initialState);
