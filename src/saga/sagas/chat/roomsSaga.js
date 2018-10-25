import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import axios from 'axios';

import { fetchRooms } from '../../../redux/ducks/chat/rooms';

import { getToken } from '../../../utils/auth';


function* fetchRoomsIterator() {
  try {
    const token = yield call(getToken);
    const { data } = yield call(axios.get, 'https://aag.secrettech.io/rooms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(fetchRooms.success(data));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* fetchRoomsSaga() {
  yield takeLatest(
    fetchRooms.REQUEST,
    fetchRoomsIterator
  )
}


export default function* () {
  yield all([
    fork(fetchRoomsSaga)
  ]);
}
