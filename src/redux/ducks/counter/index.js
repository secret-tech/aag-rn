import { createAction, handleActions } from 'redux-actions';


export const incrementCounter = createAction('COUNTER_INCREMENT');
export const decrementCounter = createAction('COUNTER_DECREMENT');


const initialState = 0;


export default handleActions({
  [incrementCounter]: (state) => state + 1,
  [decrementCounter]: (state) => state - 1
}, initialState);


export const getCounter = state => state.counter;