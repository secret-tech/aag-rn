import { createAction, createAsyncAction, createReducer } from '../../../utils/actions';

export const REQ_CONVERSATIONS = 'chat/rooms/REQ_CONVERSATIONS';
export const RES_CONVERSATIONS = 'chat/rooms/RES_CONVERSATIONS';

export const reqConversations = createAction(REQ_CONVERSATIONS);
export const resConversations = createAction(RES_CONVERSATIONS);

const initialState = {
  conversations: []
};

export default createReducer({
  [RES_CONVERSATIONS]: (state, { payload }) => ({
    conversations: payload
  })
}, initialState);
