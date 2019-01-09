import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

import { updateBio } from '../../../redux/ducks/profile/editBio';
import { mergeBio } from '../../../redux/ducks/profile/profile';

import { getToken } from '../../../utils/auth';


function* updateBioIterator({ payload }) {
  try {
    const token = yield call(getToken);
    const req = { bio: payload };
    const { data } = yield call(axios.post, 'https://aag.secrettech.io/user/bio', req, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(updateBio.success(data));
    yield put(mergeBio(payload));
    yield put(NavigationActions.navigate({
      routeName: 'Profile',
      action: NavigationActions.navigate({
        routeName: 'ProfileEditProfile'
      })
    }));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* updateBioSaga() {
  yield takeLatest(
    updateBio.REQUEST,
    updateBioIterator
  )
}


export default function* () {
  yield all([
    fork(updateBioSaga)
  ]);
}
