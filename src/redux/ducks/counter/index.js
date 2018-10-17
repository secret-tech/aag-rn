import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';


export const incrementCounter = createAction('COUNTER_INCREMENT');
export const decrementCounter = createAction('COUNTER_DECREMENT');


const initialState = Map({
  num: 0
});


export default handleActions({
  [incrementCounter]: (state) => state.update('num', (n) => n + 1),
  [decrementCounter]: (state) => state.update('num', (n) => n - 1)
}, initialState);


export const getCounter = state => state.counter;