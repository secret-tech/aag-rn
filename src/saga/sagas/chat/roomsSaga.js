import { all, fork, take, takeEvery, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import { SOCKET_CONNECT, loadConversations, loadConversation, sendMessage, receiveMessage } from '../../../redux/ducks/chat/rooms';

import { getToken } from '../../../utils/auth';


function* createEventChannel(socket) {
  return eventChannel((emit) => {
    socket.on('loadConversations', (conversations) => {
      emit(loadConversations(conversations));
    });

    socket.on('messages', (messages) => {
      console.log('createEventChannel messages', messages);
      emit(loadConversation.success(messages));
    });

    socket.on('message', (message) => {
      emit(receiveMessage(message));
    })

    return () => {
      socket.disconnect();
    };
  });
}

function* read(socket) {
  const channel = yield call(createEventChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* loadMessagesGenerator(socket) {
  while (true) {
    const { payload } = yield take(loadConversation.REQUEST);
    yield call(console.log, payload);
    socket.emit('loadMessages', { conversationId: payload });
    yield call(console.log, 'LOG AFTER EMIT');
  }
}

function* sendMessageGenerator(socket) {
  while (true) {
    const { payload } = yield take(sendMessage.REQUEST);
    payload.messages.forEach((message) => {
      const req = {
        ...message,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        conversationId: payload.conversationId
      };
      socket.emit('message', req);
    });
  }
}

function* initializeWebSocketsChannel() {
  const token = yield call(getToken);
  const socket = yield call(io, 'ws://aag.secrettech.io', { query: { token } });
  yield call(console.log, 'socket connected', socket);
  yield all([
    yield fork(read, socket),
    yield fork(loadMessagesGenerator, socket),
    yield fork(sendMessageGenerator, socket)
  ]);
}


export default function* () {
  yield all([
    fork(initializeWebSocketsChannel)
  ]);
}
