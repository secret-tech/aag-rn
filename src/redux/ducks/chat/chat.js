import { createAction, createAsyncAction, createReducer } from '../../../utils/actions';

export const REQ_FIND_OR_CREATE_CONVERSATION = 'chat/chat/FIND_OR_CREATE_CONVERSATION';
export const REQ_CONVERSATION = 'chat/chat/REQ_CONVERSATION';
export const RES_CONVERSATION = 'chat/chat/RES_CONVERSATION';
export const REQ_MESSAGES = 'chat/chat/REQ_MESSAGES';
export const RES_MESSAGES = 'chat/chat/RES_MESSAGES';
export const REQ_SEND_MESSAGE = 'chat/chat/REQ_SEND_MESSAGE';
export const RES_RECEIVE_MESSAGE = 'chat/chat/RES_RECEIVE_MESSAGE';
export const REDIRECT_TO_CONVERSATION = 'chat/chat/REDIRECT_TO_CONVERSATION';

export const reqFindOrCreateConversation = createAction(REQ_FIND_OR_CREATE_CONVERSATION);
export const reqConversation = createAction(REQ_CONVERSATION);
export const resConversation = createAction(RES_CONVERSATION);
export const reqMessages = createAction(REQ_MESSAGES);
export const resMessages = createAction(RES_MESSAGES);
export const reqSendMessage = createAction(REQ_SEND_MESSAGE);
export const resReceiveMessage = createAction(RES_RECEIVE_MESSAGE);
export const redirectToConversation = createAction(REDIRECT_TO_CONVERSATION);

const initialState = {
  conversation: {}
};

export default createReducer({
  [RES_CONVERSATION]: (state, { payload }) => ({
    conversation: payload
  })
}, initialState);
