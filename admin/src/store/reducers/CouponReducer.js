import { REMOVE_SINGLE_COUPON, REMOVE_COUPON_ERRORS, REMOVE_COUPON_LOADER, REMOVE_COUPON_MESSAGE, REMOVE_COUPON_REDIRECT, SET_SINGLE_COUPON, SET_COUPONS, SET_COUPON_ERRORS, SET_COUPON_LOADER, SET_COUPON_MESSAGE, SET_COUPON_REDIRECT } from "../types/CouponType";

const initState = {
    loading: false,
    couponErrors: [],
    redirect: false,
    message: '',
    coupons: [],
    coupon: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
}

const CouponReducer = (state=initState, action) =>{
    if(action.type === SET_COUPON_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_COUPON_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_COUPON_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_COUPON_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_COUPON_ERRORS){
        return{...state, couponErrors: action.payload  };
    }
    else if(action.type === REMOVE_COUPON_ERRORS){
        return{...state, couponErrors: [] };
    }
    else if(action.type === SET_COUPON_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_COUPON_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_COUPONS){
        return{...state, coupons: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/coupon/all' };
    }
    else if(action.type === SET_SINGLE_COUPON){
        return{...state, coupon: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_COUPON){
        return{...state, status: false };
    }
    else{
        return state;
    }
}
export default CouponReducer;