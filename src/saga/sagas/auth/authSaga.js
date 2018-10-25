import { all, takeLatest, call, fork, put, select } from 'redux-saga/effects';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

import { fetchFbToken, signUp, SIGN_OUT } from '../../../redux/ducks/auth/auth';

import { setToken, rmToken } from '../../../utils/auth';


function* fetchFbTokenIterator() {
  try {
    const fbReqPerm = ['public_profile', 'email', 'user_birthday', 'user_friends'];
    yield LoginManager.logInWithReadPermissions(fbReqPerm);
    const { accessToken } = yield AccessToken.getCurrentAccessToken();

    yield put(fetchFbToken.success(accessToken));

    const res = yield call(
      axios.post,
      'https://aag.secrettech.io/auth/facebook',
      { access_token: accessToken }
    );

    if (res.data.user === null) {
      yield put(NavigationActions.navigate({ routeName: 'SignUp' }));
    } else {
      yield call(setToken, res.data.token);
      yield put(NavigationActions.navigate({ routeName: 'Home' }));
    }
  } catch (e) {
    yield call(console.log, e);
  }
}

function* fetchFbTokenSaga() {
  yield takeLatest(
    fetchFbToken.REQUEST,
    fetchFbTokenIterator
  );
}


const authSelector = (state) => state.auth.auth;

function* signUpIterator({ payload }) {
  try {
    const auth = yield select(authSelector);
    const req = { access_token: auth.get('fbToken'), role: payload };
    const res = yield call(
      axios.post,
      'https://aag.secrettech.io/auth/registerFacebook',
      req
    );

    yield call(setToken, res.data.token);
    yield put(NavigationActions.navigate({ routeName: 'Home' }));
    yield put(signUp.success());
  } catch (e) {
    yield call(console.log, e);
  }
}

function* signUpSaga() {
  yield takeLatest(
    signUp.REQUEST,
    signUpIterator
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
    fork(fetchFbTokenSaga),
    fork(signUpSaga),
    fork(signOutSaga)
  ]);
}