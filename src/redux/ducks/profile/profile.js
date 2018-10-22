import { createAsyncAction, createAction, createReducer } from '../../../utils/actions';
import { Map } from 'immutable';

export const FETCH_PROFILE = 'profile/profile/FETCH_PROFILE';
export const MERGE_BIO = 'profile/profile/MERGE_BIO';

export const fetchProfile = createAsyncAction(FETCH_PROFILE);
export const mergeBio = createAction(MERGE_BIO);

const initialState = Map({
  loading: false,
  email: '',
  name: '',
  gender: '',
  age: 0,
  picture: '',
  birthday: '',
  bio: '',
  tags: []
});

export default createReducer({
  [fetchProfile.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [fetchProfile.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    ...payload
  }),

  [fetchProfile.FAILURE]: (state) => state.merge({
    loading: false
  }),

  [MERGE_BIO]: (state, { payload }) => state.merge({
    bio: payload
  })
}, initialState);
