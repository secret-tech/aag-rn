import { all, takeLatest, call, fork, put } from 'redux-saga/effects';

import { incrementCounter, decrementCounter } from '../../../redux/ducks/counter';


function* counterIterator() {
  yield call(console.log, 'saga called');
}

function* counterSaga() {
  yield takeLatest(
    'COUNTER_INCREMENT',
    counterIterator
  );
}


export default function* () {
  yield all([
    fork(counterSaga)
  ]);
}