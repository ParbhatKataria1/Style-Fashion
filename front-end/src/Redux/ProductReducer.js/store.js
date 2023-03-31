import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { productReducer } from './reducer';
<<<<<<< HEAD
import thunk from 'redux-thunk'
=======
import thunk from 'redux-thunk';
>>>>>>> 39c06aafacb97000571ea9dc56f5bfede26475a8

const rootReducer =combineReducers({
    productReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
