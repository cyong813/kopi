import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers';

const initialState = {}
const middleware = [thunk]

const reducers = combineReducers({
  auth: authReducer
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer =
  composeEnhancers(
    applyMiddleware(...middleware),
  );

const store = createStore(
  reducers,
  initialState,
  enhancer
);

export default store;