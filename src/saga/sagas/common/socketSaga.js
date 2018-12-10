import { all, fork, take, takeLatest, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { NavigationActions } from 'react-navigation';

import { INIT_SOCKET } from '../../../redux/ducks/common/socket';
import { REQ_CONVERSATIONS, resConversations } from '../../../redux/ducks/chat/rooms';
import { REQ_FIND_OR_CREATE_CONVERSATION, resConversation, redirectToConversation, REDIRECT_TO_CONVERSATION, resMessages, REQ_MESSAGES, REQ_SEND_MESSAGE, resReceiveMessage } from '../../../redux/ducks/chat/chat';
import { REQ_CALL, REQ_ACCEPT_CALL, REQ_DECLINE_CALL, resIcomingCall, resCallAccepted, resCallDeclined, RES_INCOMING_CALL, RES_CALL_ACCEPTED, RES_CALL_DECLINED } from '../../../redux/ducks/chat/call';

import socketService from '../../../utils/socketService';


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

    socket.on('res:messages', (messages) => {
      console.log('res:messages', messages);
      emit(resMessages(messages));
    });

    socket.on('res:receiveMessage', (message) => {
      console.log('res:receiveMessage', message);
      emit(resReceiveMessage(message));
    });

    socket.on('res:incomingCall', (payload) => {
      console.log('res:incomingCall', payload);
      emit(resIcomingCall(payload));
    });

    socket.on('res:callAccepted', (payload) => {
      console.log('res:callAccepted', payload);
      emit(resCallAccepted(payload.conversationId));
    });

    socket.on('res:callDeclined', (payload) => {
      console.log('res:callDeclined', payload);
      emit(resCallDeclined(payload.conversationId));
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

function* reqMessagesGenerator(socket) {
  while (true) {
    // payload { key: payload.key, conversationId: payload.conversationId }
    const { payload } = yield take(REQ_MESSAGES);
    socket.emit('req:messages', payload);
    console.log('req:message', payload);
  }
}

function* reqSendMessageGenerator(socket) {
  while (true) {
    const { payload } = yield take(REQ_SEND_MESSAGE);
    payload.messages.forEach(({ message }) => {
      socket.emit('req:sendMessage', { 
        text: message, 
        conversationId: payload.conversationId
      });
    });
  }
}

function* reqCallGenerator(socket) {
  while (true) {
    const { payload: { conversationId, user } } = yield take(REQ_CALL);
    socket.emit('req:call', { conversationId });
    yield put(NavigationActions.navigate({ 
      routeName: 'ChatOutgoingCall', 
      params: { conversationId, user } 
    }));

    console.log('req:call', { conversationId, user });
  }
}

function* reqAcceptCallGenerator(socket) {
  while (true) {
    const { payload: conversationId } = yield take(REQ_ACCEPT_CALL);
    console.log('call accepted');
    socket.emit('req:acceptCall', { conversationId });
    yield put(NavigationActions.navigate({
      routeName: 'ChatCall',
      params: { conversationId }
    }));

    console.log('req:acceptCall', { conversationId });
  }
}

function* reqDeclineCallGenerator(socket) {
  while (true) {
    const { payload: conversationId } = yield take(REQ_DECLINE_CALL);
    console.log('call declined');
    socket.emit('req:declineCall', { conversationId });
    yield put(NavigationActions.back());
    
    console.log('req:declineCall', { conversationId });
  }
}

function* resIncomingCallGenerator(socket) {
  while (true) {
    const { payload } = yield take(RES_INCOMING_CALL);
    yield put(NavigationActions.navigate({
      routeName: 'ChatIncomingCall',
      params: payload
    }));

    console.log('res:incomingCall generator', payload);
  }
}

function* resCallAcceptedGenerator(socket) {
  while (true) {
    const { payload: conversationId } = yield take(RES_CALL_ACCEPTED);
    yield put(NavigationActions.navigate({
      routeName: 'ChatCall',
      params: { conversationId }
    }));

    console.log('res:callAccepted generator', conversationId);
  }
}

function* resCallDeclinedGenerator(socket) {
  while (true) {
    const { payload: conversationId } = yield take(RES_CALL_DECLINED);
    yield put(NavigationActions.back());

    console.log('res:callDeclined generator', conversationId);
  }
}


function* initializeWebSocketsChannel() {
  // const socket = yield call(socketService);
  const socket = global.socket;
  yield call(console.log, 'initializeWebSocketsChannel socket client', socket);

  socket.on('disconnect', () => {
    console.warn('[DICONNECT]', socket);
    socket.connect();
    console.warn('[RECONNECTION', socket);
  });

  yield all([
    yield fork(read, socket),
    yield fork(reqConversationsGenerator, socket),
    yield fork(reqFindOrCreateConversationGenerator, socket),
    yield fork(redirectToConversationGenerator, socket),
    yield fork(reqMessagesGenerator, socket),
    yield fork(reqSendMessageGenerator, socket),
    yield fork(reqCallGenerator, socket),
    yield fork(reqAcceptCallGenerator, socket),
    yield fork(reqDeclineCallGenerator, socket),
    yield fork(resIncomingCallGenerator, socket),
    yield fork(resCallAcceptedGenerator, socket),
    yield fork(resCallDeclinedGenerator, socket)
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