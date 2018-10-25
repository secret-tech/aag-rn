import { all, fork } from 'redux-saga/effects';

import authSaga from './sagas/auth/authSaga';

import profileSaga from './sagas/profile/profileSaga';
import editBioSaga from './sagas/profile/editBioSaga';
import editTagsSaga from './sagas/profile/editTagsSaga';

import exploreSaga from './sagas/explore/exploreSaga';
import subExploreSaga from './sagas/explore/subExploreSaga';

import roomSaga from './sagas/chat/roomSaga';
import roomsSaga from './sagas/chat/roomsSaga';

export default function* () {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(editBioSaga),
    fork(editTagsSaga),
    fork(exploreSaga),
    fork(subExploreSaga),
    fork(roomSaga),
    fork(roomsSaga)
  ]);
}
