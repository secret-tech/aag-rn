import { createAsyncAction, createAction, createReducer } from '../../../utils/actions';

export const FETCH_ROOMS = 'chat/rooms/FETCH_ROOMS';
export const MERGE_ROOM = 'chat/rooms/MERGE_ROOM';
export const MERGE_LAST_MESSAGE = 'chat/rooms/MERGE_LAST_MESSAGE';

export const fetchRooms = createAsyncAction(FETCH_ROOMS);
export const mergeRoom = createAction(MERGE_ROOM);
export const mergeLastMessage = createAction(MERGE_LAST_MESSAGE);

const initialState = {
  loading: false,
  conversations: []
};

const joinWithoutDupes = (a, b) => {
  const aset = new Set(a.map(x => x._id));
  return [...a, ...b.filter(x => !aset.has(x._id))];
}

export default createReducer({
  [fetchRooms.REQUEST]: (state) => ({
    ...state,
    loading: true
  }),

  [fetchRooms.SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    conversations: joinWithoutDupes(state.conversations, payload)
  }),

  [fetchRooms.FAILURE]: (state) => ({
    ...state,
    loading: false
  }),

  [MERGE_ROOM]: (state, { payload }) => ({
    ...state,
    conversations: joinWithoutDupes(state.conversations, [payload])
  }),

  [MERGE_LAST_MESSAGE]: (state, { payload }) => {
    console.log(state, payload);
    return state;
  }
}, initialState);
