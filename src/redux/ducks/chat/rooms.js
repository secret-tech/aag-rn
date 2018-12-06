import { createAction, createAsyncAction, createReducer } from '../../../utils/actions';

export const INIT_SOCKET = 'chat/rooms/INIT_SOCKET';
export const OPEN_CONVERSATION = 'chat/rooms/OPEN_CONVERSATION';

export const LOAD_CONVERSATIONS = 'chat/rooms/LOAD_CONVERSATIONS';
export const SOCKET_CONNECT = 'chat/rooms/SOCKET_CONNECT';
export const LOAD_CONVERSATION = 'chat/rooms/LOAD_CONVERSATION';
export const PURGE_CONVERSATION = 'chat/rooms/PURGE_CONVERSATION';
export const FETCH_MORE_MESSAGES = 'chat/rooms/FETCH_MORE_MESSAGES';
export const SEND_MESSAGE = 'chat/rooms/SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'chat/rooms/RECEIVE_MESSAGE';
export const MERGE_ROOM = 'chat/rooms/MERGE_ROOM';

export const initSocket = createAction(INIT_SOCKET);
export const openConversation = createAsyncAction(OPEN_CONVERSATION);

export const loadConversations = createAction(LOAD_CONVERSATIONS);
export const socketConnect = createAction(SOCKET_CONNECT);
export const loadConversation = createAsyncAction(LOAD_CONVERSATION);
export const purgeConversation = createAction(PURGE_CONVERSATION);
export const fetchMoreMessages = createAsyncAction(FETCH_MORE_MESSAGES);
export const sendMessage = createAsyncAction(SEND_MESSAGE);
export const receiveMessage = createAction(RECEIVE_MESSAGE);
export const mergeRoom = createAction(MERGE_ROOM);


export const FETCH_ROOMS = 'chat/rooms/FETCH_ROOMS';
export const MERGE_LAST_MESSAGE = 'chat/rooms/MERGE_LAST_MESSAGE';

export const fetchRooms = createAsyncAction(FETCH_ROOMS);
export const mergeLastMessage = createAction(MERGE_LAST_MESSAGE);


const initialState = {
  loading: false,
  conversations: [],
  conversation: {
    id: '',
    user: {},
    friend: {},
    messages: []
  }
};

// TODO reducer requires refactor

export default createReducer({
  [openConversation.SUCCESS]: (state, { payload: conversation }) => {
    const conversations = [conversation, ...state.conversations];

    const exist = state.conversations.reduce((acc, conv) => {
      if (conv.id === conversation.id) return true;
      return acc;
    }, false);

    return ({
      ...state,
      conversations: exist ? state.conversations : conversations,
      conversation
    });
  },

  [LOAD_CONVERSATIONS]: (state, { payload }) => ({
    ...state,
    conversations: payload
  }),

  [loadConversation.SUCCESS]: (state, { payload }) => {
    console.log('load conversation success', payload);
    return ({
      ...state,
      conversation: payload
    });
  },

  [PURGE_CONVERSATION]: (state) => ({
    ...state,
    conversation: initialState.conversation
  }),

  [fetchMoreMessages.SUCCESS]: (state, { payload }) => ({
    ...state,
    conversation: {
      ...state.conversation,
      messages: [...state.conversation.messages, ...payload.messages]
    }
  }),

  [sendMessage.REQUEST]: (state, { payload }) => {
    const conversations = state.conversations.map((conv) => {
      if (conv.id === payload.conversationId) {
        return {
          ...conv,
          messages: [...payload.messages, ...conv.messages]
        };
      }

      return conv;
    });

    const messages = state.conversation.id === payload.conversationId
      ? [...payload.messages, ...state.conversation.messages]
      : state.conversation.messages;

    return ({
      ...state,
      conversations,
      conversation: {
        ...state.conversation,
        messages
      }
    });
  },

  [MERGE_ROOM]: (state, { payload }) => {
    const conversations = [payload, ...state.conversations];

    const exist = state.conversations.reduce((acc, conv) => {
      if (conv.id === payload.id) return true;
      return acc;
    }, false);

    return ({
      ...state,
      conversations: exist ? state.conversations : conversations
    });
  },

  [RECEIVE_MESSAGE]: (state, { payload }) => {
    const { conversationId, ...message } = payload;

    const conversations = state.conversations.map((conv) => {
      if (conv.id === conversationId) {
        return ({
          ...conv,
          messages: [message, ...conv.messages]
        });
      }

      return conv;
    });

    const messages = state.conversation.id === conversationId
      ? [message, ...state.conversation.messages]
      : state.conversation.messages;

    return ({
      ...state,
      conversations,
      conversation: {
        ...state.conversation,
        messages
      }
    });
  }
}, initialState);
