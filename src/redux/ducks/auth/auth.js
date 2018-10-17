import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map, fromJS } from 'immutable';

const FETCH_FB_USER_DATA = 'auth/auth/FETCH_FB_USER_DATA';
const SIGN_IN = 'auth/auth/SING_IN';
const SIGN_UP = 'auth/auth/SIGN_UP';

export const fetchFbUserData = createAsyncAction(FETCH_FB_USER_DATA);
export const signIn = createAsyncAction(SIGN_IN);
export const signUp = createAsyncAction(SIGN_UP);

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

  [fetchFbUserData.SUCCESS]: (state, { payload }) => {
    console.log(payload);
    return (
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
    )
  },

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
  )
}, initialState);

export const getCounter = state => state.counter;