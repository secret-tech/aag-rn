import { createAsyncAction, createReducer } from '../../../utils/actions';
import { Map } from 'immutable';

export const UPDATE_TAGS = 'profile/editTags/UPDATE_TAGS';

export const updateTags = createAsyncAction(UPDATE_TAGS);

const initialState = Map({
  loading: false
});

export default createReducer({
  [updateTags.REQUEST]: (state) => state.merge({
    loading: true
  }),

  [updateTags.SUCCESS]: (state) => state.merge({
    loading: false
  }),

  [updateTags.FAILURE]: (state) => state.merge({
    loading: false
  })
}, initialState);
