import { createAction, createReducer } from '../../../utils/actions';

export const INIT_SOCKET = 'common/socket/INIT_SOCKET';

export const initSocket = createAction(INIT_SOCKET);

const initialState = {};

export default createReducer({}, initialState);
