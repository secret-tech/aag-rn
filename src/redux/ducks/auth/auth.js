import { createAsyncAction, createReducer, createAction } from '../../../utils/actions';
import { Map, fromJS } from 'immutable';

export const FETCH_FB_USER_DATA = 'auth/auth/FETCH_FB_USER_DATA';
export const SIGN_IN = 'auth/auth/SING_IN';
export const SIGN_UP = 'auth/auth/SIGN_UP';
export const SIGN_OUT = 'auth/auth/SIGN_OUT';

export const fetchFbUserData = createAsyncAction(FETCH_FB_USER_DATA);
export const signIn = createAsyncAction(SIGN_IN);
export const signUp = createAsyncAction(SIGN_UP);
export const signOut = createAction(SIGN_OUT);

const initialState = Map({
  authorized: false,
  jwt: '',
  loading: false,
  fbUserData: fromJS({
    ageRange: 0,
    birthday: '',
    email: '',
    firstName: '',
    lastName: '',
    name: '',
    id: '',
    picture: ''
  })
});

export default createReducer({
  [fetchFbUserData.REQUEST]: (state) => (
    state.merge({
      loading: true
    })
  ),

  [fetchFbUserData.SUCCESS]: (state, { payload }) => (
    state.merge({
      loading: false,
      fbUserData: fromJS({
        ageRange: payload.age_range.min,
        birthday: payload.birthday,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
        name: payload.name,
        id: payload.id,
        picture: payload.picture.data.url
      })
    })
  ),

  [fetchFbUserData.FAILURE]: (state) => (
    state.merge({
      loading: false
    })
  ),

  [signIn.REQUEST]: (state) => (
    state.merge({
      loading: true
    })
  ),

  [signIn.SUCCESS]: (state) => (
    state.merge({
      loading: false
    })
  ),

  [signIn.FAILURE]: (state) => (
    state.merge({
      loading: false
    })
  ),

  [SIGN_OUT]: (state) => (
    state.merge({
      authorized: false,
      jwt: '',
    })
  )
}, initialState);

export const getCounter = state => state.counter;