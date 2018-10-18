import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { Map } from 'immutable';
// import thunk from 'redux-thunk';

import { navMiddleware } from '../navigation/AppNavigator';

import rootReducer from './rootReducer';
import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
  const middlewares = [
    sagaMiddleware,
    navMiddleware
  ];

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore();