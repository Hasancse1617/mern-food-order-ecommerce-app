import { REMOVE_BANNER_LOADER, SET_BANNERS, SET_BANNER_LOADER } from "../types/BannerType"

const initState = {
    loading: false,
    banners: [],
}

const BannerReducer = (state=initState, action) =>{
    if(action.type === SET_BANNER_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_BANNER_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_BANNERS){
        return{...state, banners: action.payload}
    }
    else{
        return state;
    }
}
export default BannerReducer;