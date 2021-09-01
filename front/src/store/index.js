import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import CategoryReducer from './reducers/CategoryReducer';
import ProductReducer from './reducers/ProductReducer';

const rootReducers = combineReducers({
    CategoryReducer,
    ProductReducer
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;