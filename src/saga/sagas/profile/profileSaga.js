import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import axios from 'axios';

import { fetchProfile } from '../../../redux/ducks/profile/profile';

import { getToken } from '../../../utils/auth';


function* fetchProfileIterator() {
  try {
    const token = yield call(getToken);
    const { data } = yield call(axios.get, 'https://aag.secrettech.io/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(fetchProfile.success(data));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* fetchProfileSaga() {
  yield takeLatest(
    fetchProfile.REQUEST,
    fetchProfileIterator
  )
}


export default function* () {
  yield all([
    fork(fetchProfileSaga)
  ]);
}
