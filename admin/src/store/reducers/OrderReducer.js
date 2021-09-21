import { REMOVE_ORDER_ERRORS, REMOVE_ORDER_LOADER, REMOVE_ORDER_MESSAGE, SET_ORDERS, SET_ORDER_ERRORS, SET_ORDER_LOADER, SET_ORDER_MESSAGE, SET_SINGLE_ORDER } from "../types/OrderType"

const initState = {
    loading: false,
    orderErrors: [],
    message: "",
    orders: [],
    order: [],
    count: 0,
    perPage: 0,
    pageLink: '',
}
const OrderReducer = (state=initState, action) =>{
    if(action.type === SET_ORDER_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_ORDER_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_ORDER_ERRORS){
        return{...state, orderErrors: action.payload}
    }
    else if(action.type === REMOVE_ORDER_ERRORS){
        return{...state, orderErrors: []}
    }
    else if(action.type === SET_ORDER_MESSAGE){
        return{...state, message: action.payload}
    }
    else if(action.type === SET_ORDERS){
        return{...state, orders: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/order/all'}
    }
    else if(action.type === REMOVE_ORDER_MESSAGE){
        return{...state, message: ""}
    }
    else if(action.type === SET_SINGLE_ORDER){
        return{...state, order: action.payload}
    }
    else{
        return state;
    }
}
export default OrderReducer;