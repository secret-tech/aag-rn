import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map, List } from 'immutable';

export const FETCH_ROOMS = 'chat/rooms/FETCH_ROOMS';

export const fetchRooms = createAsyncAction(FETCH_ROOMS);

const initialState = Map({
  loading: false,
  data: List()
});

export default createReducer({
  [fetchRooms.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [fetchRooms.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    data: List(payload)
  }),

  [fetchRooms.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
