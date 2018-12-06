import { createAsyncAction, createAction, createReducer } from '../../../utils/actions';
import { Map, List } from 'immutable';

export const FETCH_PROFILE = 'profile/profile/FETCH_PROFILE';
export const MERGE_BIO = 'profile/profile/MERGE_BIO';
export const MERGE_TAGS = 'profile/profile/MERGE_TAGS';

export const fetchProfile = createAsyncAction(FETCH_PROFILE);
export const mergeBio = createAction(MERGE_BIO);
export const mergeTags = createAction(MERGE_TAGS);

const initialState = Map({
  loading: false,
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  age: 0,
  picture: '',
  birthday: '',
  bio: '',
  tags: List()
});

export default createReducer({
  [fetchProfile.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [fetchProfile.SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    id: payload.id,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    gender: payload.gender,
    age: payload.age,
    picture: payload.picture,
    birthday: payload.birthday,
    bio: payload.bio,
    tags: List(payload.tags)
  }),

  [fetchProfile.FAILURE]: (state) => state.merge({
    loading: false
  }),

  [MERGE_BIO]: (state, { payload }) => state.merge({
    bio: payload
  }),

  [MERGE_TAGS]: (state, { payload }) => state.merge({
    tags: List(payload)
  })
}, initialState);
