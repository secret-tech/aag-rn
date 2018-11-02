import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

import { signIn, SIGN_OUT } from '../../../redux/ducks/auth/auth';

import { setToken, rmToken } from '../../../utils/auth';


function* signInIterator({ payload }) {
  try {
    const fbReqPerm = ['public_profile', 'email', 'user_birthday', 'user_friends'];
    yield LoginManager.logInWithReadPermissions(fbReqPerm);
    const { accessToken } = yield AccessToken.getCurrentAccessToken();

    const { data } = yield call(
      axios.post,
      'https://aag.secrettech.io/auth/facebook',
      { access_token: accessToken, playerId: payload.playerId }
    );

    yield call(setToken, data.token);
    yield put(signIn.success(data.token));
    yield put(NavigationActions.navigate({ routeName: 'Home' }));
  } catch (e) {
    yield call(console.log, e);
    yield put(signIn.failure());
  }
}

function* signInSaga() {
  yield takeLatest(
    signIn.REQUEST,
    signInIterator
  );
}


function* signOutIterator() {
  try {
    yield call(rmToken);
    yield put(NavigationActions.navigate({ routeName: 'Auth' }));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* signOutSaga() {
  yield takeLatest(
    SIGN_OUT,
    signOutIterator
  )
}


export default function* () {
  yield all([
    fork(signInSaga),
    fork(signOutSaga)
  ]);
}