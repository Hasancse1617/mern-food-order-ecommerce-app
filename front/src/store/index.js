import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import CategoryReducer from './reducers/CategoryReducer';
import ProductReducer from './reducers/ProductReducer';
import PostReducer from './reducers/PostReducer';
import UserReducer from './reducers/UserReducer';

const rootReducers = combineReducers({
    CategoryReducer,
    ProductReducer,
    PostReducer,
    UserReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;