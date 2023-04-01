import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { productReducer } from './reducer';
<<<<<<< HEAD
<<<<<<< HEAD
import thunk from 'redux-thunk'
=======
import thunk from 'redux-thunk';
>>>>>>> 39c06aafacb97000571ea9dc56f5bfede26475a8
=======
import thunk from 'redux-thunk'
>>>>>>> 05712b9a649aeb067a3896a81ef677336bcceb2a

const rootReducer =combineReducers({
    productReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
