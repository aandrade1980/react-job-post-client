import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import jobReducer from './reducers/jobReducer';
import categoryReducer from './reducers/categoryReducer';
import userReducer from './reducers/userReducer';
import toastReducer from './reducers/toastReducer';

const initialState = {};

const middleware = [thunk, logger];

const reducers = combineReducers({
  job: jobReducer,
  category: categoryReducer,
  user: userReducer,
  toast: toastReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
