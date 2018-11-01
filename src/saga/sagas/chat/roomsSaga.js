import { all, fork, take, takeLatest, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { NavigationActions } from 'react-navigation';
import io from 'socket.io-client';

import { openConversation, loadConversations, loadConversation, sendMessage, receiveMessage } from '../../../redux/ducks/chat/rooms';

import { getToken } from '../../../utils/auth';


function* createEventChannel(socket) {
  return eventChannel((emit) => {
    socket.on('conversationCreated', (conversation) => {
      emit(openConversation.success(conversation));
    });

    socket.on('conversationExists', (conversation) => {
      emit(openConversation.success(conversation));
    })

    socket.on('loadConversations', (conversations) => {
      emit(loadConversations(conversations));
    });

    socket.on('messages', (messages) => {
      emit(loadConversation.success(messages));
    });

    socket.on('message', (message) => {
      emit(receiveMessage(message));
    });

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


function* openConversationGenerator(socket) {
  while (true) {
    const { payload } = yield take(openConversation.REQUEST); // second user id
    socket.emit('createConversation', { userId: payload });
  }
}

function* loadMessagesGenerator(socket) {
  while (true) {
    const { payload } = yield take(loadConversation.REQUEST); // conversation id
    socket.emit('loadMessages', { conversationId: payload });
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


function* openConversationIterator({ payload }) {
  try {
    yield put(NavigationActions.navigate({ routeName: 'ChatChat', params: { conversationId: payload.conversation._id } }));
  } catch (e) {
    yield put(openConversation.failure());
    yield call(console.log, e);
  }
}

function* openConversationSaga() {
  yield takeLatest(
    openConversation.SUCCESS,
    openConversationIterator
  )
}


function* initializeWebSocketsChannel() {
  window.navigator.userAgent = 'react-native'; // required to connect on iOS
  const token = yield call(getToken);
  const socket = io('wss://aag.secrettech.io', {
    query: { token },
    jsonp: false,  // required to connect on iOS
    transports: ['websocket']  // required to connect on iOS
  });

  yield call(console.log, socket);
  yield all([
    yield fork(read, socket),
    yield fork(openConversationSaga),
    yield fork(openConversationGenerator, socket),
    yield fork(loadMessagesGenerator, socket),
    yield fork(sendMessageGenerator, socket)
  ]);
}


export default function* () {
  yield all([
    fork(initializeWebSocketsChannel)
  ]);
}
