import { all, fork, take, takeLatest, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { NavigationActions } from 'react-navigation';
import io from 'socket.io-client';

import { INIT_SOCKET } from '../../../redux/ducks/common/socket';
import { REQ_CONVERSATIONS, resConversations } from '../../../redux/ducks/chat/rooms';
import { REQ_FIND_OR_CREATE_CONVERSATION, resConversation, redirectToConversation, REDIRECT_TO_CONVERSATION } from '../../../redux/ducks/chat/chat';

import { getToken } from '../../../utils/auth';


function* read(socket) {
  const channel = yield call(createEventChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}


function* createEventChannel(socket) {
  return eventChannel((emit) => {
    socket.on('res:conversations', (conversations) => {
      console.log('res:conversations', conversations);
      emit(resConversations(conversations));
    });

    socket.on('res:conversation', (conversation) => {
      console.log('res:conversation', conversation);
      emit(resConversation(conversation));
      emit(redirectToConversation(conversation.id))
    });

    return () => {
      socket.disconnect();
    };
  });
}

function* reqConversationsGenerator(socket) {
  while (true) {
    yield take(REQ_CONVERSATIONS);
    socket.emit('req:conversations');
    console.log('req:conversations');
  }
}

function* reqFindOrCreateConversationGenerator(socket) {
  while (true) {
    const { payload: userId } = yield take(REQ_FIND_OR_CREATE_CONVERSATION);
    socket.emit('req:findOrCreateConversation', { userId });
    console.log('req:findOrCreateConversation', { userId });
  }
}

function* redirectToConversationGenerator(socket) {
  while (true) {
    const { payload: conversationId } = yield take(REDIRECT_TO_CONVERSATION);

    yield put(NavigationActions.navigate({ 
      routeName: 'ChatChat', 
      params: { conversationId } 
    }));

    console.log('redirectToConversation', conversationId);
  }
}


function* initializeWebSocketsChannel() {
  window.navigator.userAgent = 'react-native';

  const token = yield call(getToken);

  const socket = io('wss://aag.secrettech.io', {
    query: { token },
    jsonp: false,
    transports: ['websocket']
  });

  socket.on('disconnect', () => {
    console.warn('[DICONNECT]', socket);
    socket.connect();
    console.warn('[RECONNECTION', socket);
  })

  yield call(console.log, 'initializeWebSocketsChannel socket client', socket);

  yield all([
    yield fork(read, socket),
    yield fork(reqConversationsGenerator, socket),
    yield fork(reqFindOrCreateConversationGenerator, socket),
    yield fork(redirectToConversationGenerator, socket)
  ]);
}

function* initializeWebSocketsChannelSaga() {
  yield takeLatest(
    INIT_SOCKET,
    initializeWebSocketsChannel
  );
}


export default function* () {
  yield all([
    fork(initializeWebSocketsChannelSaga)
  ]);
}