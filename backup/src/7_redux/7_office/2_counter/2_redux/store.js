import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import counterReducer from './counterReducer';

export default createStore(counterReducer, applyMiddleware(thunk));