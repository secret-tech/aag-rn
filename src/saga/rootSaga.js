import { all, fork } from 'redux-saga/effects';

import authSaga from './sagas/auth/authSaga';

import profileSaga from './sagas/profile/profileSaga';
import editBioSaga from './sagas/profile/editBioSaga';
import editTagsSaga from './sagas/profile/editTagsSaga';

export default function* () {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(editBioSaga),
    fork(editTagsSaga)
  ]);
}
