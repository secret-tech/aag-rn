import { all, fork } from 'redux-saga/effects';

import counterSaga from './sagas/counter/counterSaga';

export default function* () {
  yield all([
    fork(counterSaga)
  ]);
}