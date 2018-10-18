import { all, fork } from 'redux-saga/effects';

import authSaga from './sagas/auth/authSaga';

export default function* () {
  yield all([
    fork(authSaga)
  ]);
}