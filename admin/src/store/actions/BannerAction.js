import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_BANNER_ERRORS, REMOVE_BANNER_LOADER, SET_BANNERS, SET_BANNER_ERRORS, SET_BANNER_LOADER, SET_BANNER_MESSAGE, SET_BANNER_REDIRECT, SET_SINGLE_BANNER } from "../types/BannerType";
import $ from 'jquery';
import { SET_UNAUTHORIZED_ACCESS } from "../types/AuthType";

export const fetchBanners = (page, user_type) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_BANNER_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.get(`/all-banner/${user_type}/${page}`);
                dispatch({type: SET_BANNERS, payload: {response,count,perPage}});
                dispatch({type: REMOVE_BANNER_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const createBanner = (bannerData,user_type) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_BANNER_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/create-banner/${user_type}`,bannerData); 
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_MESSAGE, payload:msg});
                dispatch({type: SET_BANNER_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                if(error.response.status === 403){
                    dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const fetchBanner = (id, user_type) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_BANNER_LOADER});
          try {
                const { data } = await axiosInstance.get(`/edit-banner/${user_type}/${id}`);
                dispatch({type: SET_SINGLE_BANNER, payload: data.response});
                dispatch({type: REMOVE_BANNER_LOADER});

          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BANNER_LOADER});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const updateBanner = (bannerData,id) =>{
    return async(dispatch,getState)=>{
        try {
                const { data:{msg} } = await axiosInstance.post(`/update-banner/${id}`,bannerData); 
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_MESSAGE, payload:msg});
                dispatch({type: SET_BANNER_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id, user_type) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosInstance.get(`/delete-banner/${user_type}/${id}`);
            dispatch({type: SET_BANNER_LOADER});
            dispatch({type: REMOVE_BANNER_ERRORS});
            dispatch({type: SET_BANNER_MESSAGE, payload: data.msg});    
        } catch (error) {
            dispatch({type: SET_BANNER_ERRORS, payload: error.response.data.errors});
            if(error.response.status === 403){
                 dispatch({type: SET_UNAUTHORIZED_ACCESS});
            }
        }
      
    };
}

export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                  const {data: {status,banner_id}} = await axiosInstance.post(`/status-banner`, statusData);
                  if(status == false){
                        $('#banner-'+banner_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                  }else{
                        $('#banner-'+banner_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                  }
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}