// config redux
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //para desarrollo
import thunk from 'redux-thunk';
import rootReducer from './reducers'; //importo los reducers combinados con combineReducers


const initialState = {};

const middleware = [thunk];

const store = createStore(
   rootReducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;