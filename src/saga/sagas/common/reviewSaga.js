import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import axios from 'axios';

import { submitReview } from '../../../redux/ducks/common/review';

import { getToken } from '../../../utils/auth';


function* submitReviewIterator({ payload }) {
  try {
    const token = yield call(getToken);
    const { data } = yield call(axios.post, 'https://aag.secrettech.io/users/rate', payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(submitReview.success(data));
  } catch (e) {
    yield call(console.log, e);
    yield put(submitReview.failure());
  }
}

function* submitReviewSaga() {
  yield takeLatest(
    submitReview.REQUEST,
    submitReviewIterator
  )
}


export default function* () {
  yield all([
    fork(submitReviewSaga)
  ]);
}
