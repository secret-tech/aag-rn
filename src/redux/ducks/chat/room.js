import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map, List } from 'immutable';

export const OPEN_OR_CREATE_ROOM = 'chat/rooms/OPEN_OR_CREATE_ROOM';

export const openOrCreateRoom = createAsyncAction(OPEN_OR_CREATE_ROOM);

const initialState = Map({
  loading: false
});

export default createReducer({
  [openOrCreateRoom.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [openOrCreateRoom.SUCCESS]: (state) => state.merge({
    loading: false
  }),

  [openOrCreateRoom.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
