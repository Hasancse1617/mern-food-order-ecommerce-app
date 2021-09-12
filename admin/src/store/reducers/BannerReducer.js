import { REMOVE_SINGLE_BANNER, REMOVE_BANNER_ERRORS, REMOVE_BANNER_LOADER, REMOVE_BANNER_MESSAGE, REMOVE_BANNER_REDIRECT, SET_SINGLE_BANNER, SET_BANNERS, SET_BANNER_ERRORS, SET_BANNER_LOADER, SET_BANNER_MESSAGE, SET_BANNER_REDIRECT } from "../types/BannerType";

const initState = {
    loading: false,
    bannerErrors: [],
    redirect: false,
    message: '',
    banners: [],
    banner: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
}

const BannerReducer = (state=initState, action) =>{
    if(action.type === SET_BANNER_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_BANNER_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_BANNER_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_BANNER_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_BANNER_ERRORS){
        return{...state, bannerErrors: action.payload  };
    }
    else if(action.type === REMOVE_BANNER_ERRORS){
        return{...state, bannerErrors: [] };
    }
    else if(action.type === SET_BANNER_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_BANNER_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_BANNERS){
        return{...state, banners: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/banner/all' };
    }
    else if(action.type === SET_SINGLE_BANNER){
        return{...state, banner: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_BANNER){
        return{...state, banner: [], status: false };
    }
    else{
        return state;
    }
}
export default BannerReducer;