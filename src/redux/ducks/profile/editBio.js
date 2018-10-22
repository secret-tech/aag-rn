import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map } from 'immutable';

export const UPDATE_BIO = 'profile/editBio/UPDATE_BIO';

export const updateBio = createAsyncAction(UPDATE_BIO);

const initialState = Map({
  loading: false
});

export default createReducer({
  [updateBio.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [updateBio.SUCCESS]: (state) => state.merge({
    loading: false
  }),

  [updateBio.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
