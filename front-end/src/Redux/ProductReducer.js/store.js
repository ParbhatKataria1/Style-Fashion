import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { productReducer } from './reducer';

const rootReducer =combineReducers({
    productReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))