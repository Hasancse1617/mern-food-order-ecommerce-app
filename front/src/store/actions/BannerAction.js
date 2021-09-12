import { REMOVE_BANNER_LOADER, SET_BANNERS, SET_BANNER_ERRORS, SET_BANNER_LOADER } from "../types/BannerType";
import axiosInstance from '../../helper/axiosInstance';

export const fetchBanners = () =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_BANNER_LOADER});
          try {
                const {data: {response}} = await axiosInstance.get(`/front/banners`);
                console.log(response)
                dispatch({type: SET_BANNERS, payload: response});
                dispatch({type: REMOVE_BANNER_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}