import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

import { openOrCreateRoom } from '../../../redux/ducks/chat/room';
import { mergeRoom } from '../../../redux/ducks/chat/rooms';

import { getToken } from '../../../utils/auth';


function* openOrCreateRoomIterator({ payload }) {
  try {
    const token = yield call(getToken);
    const req = { userId: payload };
    const { data } = yield call(axios.post, 'https://aag.secrettech.io/conversations', req, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(openOrCreateRoom.success());
    yield put(mergeRoom(data.conversation));
    yield put(NavigationActions.navigate({ routeName: 'ChatChat', params: { id: data.conversation._id } }));
  } catch (e) {
    yield put(openOrCreateRoom.failure());
    yield call(console.log, e);
  }
}

function* openOrCreateRoomSaga() {
  yield takeLatest(
    openOrCreateRoom.REQUEST,
    openOrCreateRoomIterator
  )
}


export default function* () {
  yield all([
    fork(openOrCreateRoomSaga)
  ]);
}
