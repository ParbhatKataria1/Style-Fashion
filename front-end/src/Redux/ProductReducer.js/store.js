import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { productReducer } from './reducer';
import thunk from 'redux-thunk';

const rootReducer =combineReducers({
    productReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
