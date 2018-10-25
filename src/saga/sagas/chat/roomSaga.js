import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
// import axios from 'axios';

import { openOrCreateRoom } from '../../../redux/ducks/chat/room';

import { getToken } from '../../../utils/auth';


function* openOrCreateRoomIterator({ payload }) {
  try {
    const token = yield call(getToken);
    // const { data } = yield call(axios.get, 'https://aag.secrettech.io/rooms', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });

    yield call(console.log, `fetch room info with user ${payload} from backend`);
    yield call(console.log, 'navigate to room with id param');

    yield put(openOrCreateRoom.success());
    yield put(NavigationActions.navigate({ routeName: 'ChatChat', params: { id: '0' } }));
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
