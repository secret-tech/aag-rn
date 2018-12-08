import { createAction, createAsyncAction, createReducer } from '../../../utils/actions';

/*
    REQ_CALL            | peer1 init call                                           | peer1 -> server
    RES_INCOMING_CALL   | server tells the peer2 about incoming call                | server -> peer2
    REQ_ACCEPT_CALL     | peer2 accep call                                          | peer2 -> server
    REQ_DECLINE_CALL    | peer2 decline call                                        | peer2 -> server
    RES_CALL_ACCEPTED   | server tells the peer1 that the peer2 has accepted call   | server -> peer1
    RES_CALL_DECLINED   | server teels the peer1 that the peer2 has declined call   | server -> peer1
*/

export const REQ_CALL = 'chat/call/REQ_CALL';
export const RES_INCOMING_CALL = 'chat/call/RES_INCOMING_CALL';
export const REQ_ACCEPT_CALL = 'chat/call/REQ_ACCEPT_CALL';
export const REQ_DECLINE_CALL = 'chat/call/REQ_DECLINE_CALL';
export const RES_CALL_ACCEPTED = 'chat/call/RES_CALL_ACCEPTED';
export const RES_CALL_DECLINED = 'chat/call/RES_CALL_DECLINED';

export const reqCall = createAction(REQ_CALL);
export const resIcomingCall = createAction(RES_INCOMING_CALL);
export const reqAcceptCall = createAction(REQ_ACCEPT_CALL);
export const reqDeclineCall = createAction(REQ_DECLINE_CALL);
export const resCallAccepted = createAction(RES_CALL_ACCEPTED);
export const resCallDeclined = createAction(RES_CALL_DECLINED);

const initialState = {};

export default createReducer({}, initialState);
