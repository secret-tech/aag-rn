import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import axios from 'axios';

import { fetchAdvisors } from '../../../redux/ducks/explore/explore';

import { getToken } from '../../../utils/auth';


function* fetchAdvisorsIterator() {
  try {
    const token = yield call(getToken);
    const { data } = yield call(axios.get, 'https://aag.secrettech.io/explore?limit=5', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(fetchAdvisors.success(data));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* fetchAdvisorsSaga() {
  yield takeLatest(
    fetchAdvisors.REQUEST,
    fetchAdvisorsIterator
  )
}


export default function* () {
  yield all([
    fork(fetchAdvisorsSaga)
  ]);
}
