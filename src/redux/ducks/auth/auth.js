import { createAsyncAction, createReducer, createAction } from '../../../utils/actions';
import { Map } from 'immutable';

export const SIGN_IN = 'auth/auth/SING_IN';
export const SIGN_OUT = 'auth/auth/SIGN_OUT';

export const signIn = createAsyncAction(SIGN_IN);
export const signOut = createAction(SIGN_OUT);

const initialState = Map({
  authorized: false,
  jwt: '',
  loading: false
});

export default createReducer({
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

  [SIGN_OUT]: (state) => state.merge(initialState)
}, initialState);
