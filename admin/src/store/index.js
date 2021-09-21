import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import UserReducer from './reducers/UserReducer';
import AuthReducer from './reducers/AuthReducer';
import CategoryReducer from './reducers/CategoryReducer';
import ProductReducer from './reducers/ProductReducer';
import PostReducer from './reducers/PostReducer';
import CouponReducer from './reducers/CouponReducer';
import BannerReducer from './reducers/BannerReducer';
import OrderReducer from './reducers/OrderReducer';


const rootReducers = combineReducers({
     UserReducer,
     AuthReducer,
     CategoryReducer,
     ProductReducer,
     PostReducer,
     CouponReducer,
     BannerReducer,
     OrderReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;