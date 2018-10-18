import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { 
  AccessToken, 
  LoginManager, 
  GraphRequest, 
  GraphRequestManager 
} from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';

import { fetchFbUserData, SIGN_OUT } from '../../../redux/ducks/auth/auth';

import { setToken, rmToken } from '../../../utils/auth';


const createFbUserDataPayload = (accessToken) => ({
  httpMethod: 'GET',
  version: 'v3.1',
  parameters: {
    fields: {
      string: 'name,first_name,id,last_name,email,gender,birthday,picture.height(500),age_range,photos'
    }
  },
  accessToken: accessToken.toString()
});

function* fetchFbUserDataIterator() {
  try {
    const fbReqPerm = ['public_profile', 'email', 'user_birthday', 'user_friends'];
    yield LoginManager.logInWithReadPermissions(fbReqPerm);
    const { accessToken } = yield AccessToken.getCurrentAccessToken();
    const { err, result } = yield new Promise((resolve) => {
      new GraphRequestManager().addRequest(new GraphRequest('/me',
        createFbUserDataPayload(accessToken),
        (err, result) => resolve({ err, result })
      )).start();
    });

    // тут обрабатываем ответ.
    // если такой пользователь есть - коллим логин
    // если нет - редиректим на выбор роли

    yield call(console.log, err, result);
    if (true) { // TODO не забудь ебнуть это говно
      yield put(fetchFbUserData.success(result));
      yield call(setToken, 'jwt123');
      yield put(NavigationActions.navigate({ routeName: 'Home' }));

      // yield put(NavigationActions.navigate({ routeName: 'SignUp' }));
    } else {
      yield call(console.log, 'fb login cancelled', true);
    }

  } catch (e) {
    yield call(console.log, 'authSaga/fetchFbUserDataIterator', e);
  }
}

function* fetchFbUserDataSaga() {
  yield takeLatest(
    fetchFbUserData.REQUEST,
    fetchFbUserDataIterator
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
    fork(fetchFbUserDataSaga),
    fork(signOutSaga)
  ]);
}