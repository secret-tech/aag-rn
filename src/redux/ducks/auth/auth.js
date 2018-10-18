import { createAsyncAction, createReducer, createAction } from '../../../utils/actions';
import { Map } from 'immutable';

export const FETCH_FB_TOKEN = 'auth/auth/FETCH_FB_TOKEN';
export const SIGN_IN = 'auth/auth/SING_IN';
export const SIGN_UP = 'auth/auth/SIGN_UP';
export const SIGN_OUT = 'auth/auth/SIGN_OUT';

export const fetchFbToken = createAsyncAction(FETCH_FB_TOKEN);
export const signIn = createAsyncAction(SIGN_IN);
export const signUp = createAsyncAction(SIGN_UP);
export const signOut = createAction(SIGN_OUT);

const initialState = Map({
  authorized: false,
  jwt: '',
  loading: false,
  fbToken: ''
});

export default createReducer({
  [fetchFbToken.REQUEST]: (state) => state.merge({ loading: true }),

  [fetchFbToken.SUCCESS]: (state, { payload }) => (
    state.merge({
      loading: false,
      fbToken: payload
    })
  ),

  [fetchFbToken.FAILURE]: (state) => state.merge({ loading: false }),

  [signIn.REQUEST]: (state) => state.merge({
    loading: true,
    jwt: '',
    authorized: false
  }),

  [signIn.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    jwt: payload,
    authorized: true
  }),

  [signIn.FAILURE]: (state) => state.merge({
    loading: false,
    jwt: '',
    authorized: false
  }),

  [signUp.REQUEST]: (state) => state.merge({ loading: true }),
  [signUp.SUCCESS]: (state) => state.merge({ loading: false }),
  [signUp.FAILURE]: (state) => state.merge({ loading: false }),

  [SIGN_OUT]: (state) => (
    state.merge({
      loading: false,
      jwt: '',
      authorized: false
    })
  )
}, initialState);
